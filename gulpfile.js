var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var sass = require("gulp-sass")(require("sass"));
var del = require("del");
var useref = require("gulp-useref");
var cache = require("gulp-cache");
var uglify = require("gulp-uglify");
var gulpIf = require("gulp-if");
var cssnano = require("gulp-cssnano");
var imagemin = require("gulp-imagemin");
// Compile sass into CSS & auto-inject into browsers
gulp.task("sass", async function () {
	return await gulp
		.src(["app/scss/*.scss", "app/css/*.css"])
		.pipe(sass())
		.pipe(gulp.dest("app/css"))
		.pipe(gulpIf("*.css", cssnano()))
		.pipe(gulp.dest("dist/css"))
		.pipe(browserSync.stream());
});

gulp.task("js", async function () {
	return await gulp
		.src("app/*.js")
		.pipe(gulpIf("*.js", uglify()))
		.pipe(gulp.dest("dist/"));
});

// Static Server + watching scss/html files
gulp.task(
	"serve",
	gulp.series("sass", function () {
		browserSync.init({
			server: "./app/",
		});

		gulp.watch("app/scss/*.scss", gulp.series("sass"));
		gulp.watch("app/*.html").on("change", browserSync.reload);
		gulp.watch("app/*.js").on("change", browserSync.reload);
	})
);

//images

gulp.task("images", async function () {
	return await gulp
		.src("assets/images/**/*.+(png|jpg|jpeg|gif|svg|ico)")
		.pipe(
			cache(
				imagemin({
					interlaced: true,
				})
			)
		)
		.pipe(gulp.dest("dist/images"));
});

// Delete The build folder
gulp.task("clean", async function (done) {
	await del.sync("dist");
	done();
});

// Use ref

gulp.task("useref", async function () {
	return await gulp
		.src("app/*.html")
		.pipe(useref())
		.pipe(gulpIf("*.js", uglify()))
		// Minifies only if it's a CSS file
		.pipe(gulpIf("*.css", cssnano()))
		.pipe(gulp.dest("dist"));
});

//Copy Files from folder
gulp.task("copyFiles", async () => {
	return await gulp.src(["app/content/**/*"]).pipe(gulp.dest("dist/content"));
});

// Build The outcome

gulp.task(
	"build",
	gulp.series(
		"clean",
		"sass",
		"js",
		"useref",
		"images",
		"copyFiles",
		function (done) {
			done();
		}
	)
);

gulp.task("default", gulp.series("serve"));

var realFavicon = require("gulp-real-favicon");
var fs = require("fs");

// File where the favicon markups are stored
var FAVICON_DATA_FILE = "faviconData.json";

// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).
gulp.task("generate-favicon", function (done) {
	realFavicon.generateFavicon(
		{
			masterPicture: "assets/images/master_picture.png",
			dest: "dist/images/icons",
			iconsPath: "/",
			design: {
				ios: {
					pictureAspect: "backgroundAndMargin",
					backgroundColor: "#ffffff",
					margin: "14%",
					assets: {
						ios6AndPriorIcons: false,
						ios7AndLaterIcons: false,
						precomposedIcons: false,
						declareOnlyDefaultIcon: true,
					},
				},
				desktopBrowser: {
					design: "raw",
				},
				windows: {
					pictureAspect: "noChange",
					backgroundColor: "#da532c",
					onConflict: "override",
					assets: {
						windows80Ie10Tile: false,
						windows10Ie11EdgeTiles: {
							small: false,
							medium: true,
							big: false,
							rectangle: false,
						},
					},
				},
				androidChrome: {
					pictureAspect: "backgroundAndMargin",
					margin: "17%",
					backgroundColor: "#ffffff",
					themeColor: "#ffffff",
					manifest: {
						display: "standalone",
						orientation: "notSet",
						onConflict: "override",
						declared: true,
					},
					assets: {
						legacyIcon: false,
						lowResolutionIcons: false,
					},
				},
				safariPinnedTab: {
					pictureAspect: "silhouette",
					themeColor: "#5bbad5",
				},
			},
			settings: {
				scalingAlgorithm: "Mitchell",
				errorOnImageTooSmall: false,
				readmeFile: false,
				htmlCodeFile: false,
				usePathAsIs: false,
			},
			markupFile: FAVICON_DATA_FILE,
		},
		function () {
			done();
		}
	);
});

// Inject the favicon markups in your HTML pages. You should run
// this task whenever you modify a page. You can keep this task
// as is or refactor your existing HTML pipeline.
gulp.task("inject-favicon-markups", function () {
	return gulp
		.src(["dist/*.html", "dist/misc/*.html"])
		.pipe(
			realFavicon.injectFaviconMarkups(
				JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code
			)
		)
		.pipe(gulp.dest("dist"));
});

// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
gulp.task("check-for-favicon-update", function (done) {
	var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
	realFavicon.checkForUpdates(currentVersion, function (err) {
		if (err) {
			throw err;
		}
	});
});
