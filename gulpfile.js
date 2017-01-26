// //////////////////////////////////
// Required
// ////////////////////////////////


var gulp=require('gulp'),
	uglify=require('gulp-uglify'),
	browserSync=require('browser-sync'),
	reload=browserSync.reload,
	rename=require('gulp-rename'),
	del=require('del'),
	sass = require('gulp-sass'),
	autoprefixer=require('gulp-autoprefixer'),
	plumber=require('gulp-plumber');
;




// //////////////////////////////////
// scripts task
// ////////////////////////////////

gulp.task('scripts',function(){
	gulp.src(['app/js/**/*.js','!app/js/**/*.min.js'])
	.pipe(rename({suffix:'.min'}))
	.pipe(uglify())
	.pipe(plumber())
	.pipe(gulp.dest('app/js'))
			.pipe(reload({stream:true}));
});

// //////////////////////////////////
// html task
// ////////////////////////////////

gulp.task('html',function(){
gulp.src('app/**/*.html')
		.pipe(reload({stream:true}));
});


// //////////////////////////////////
// build task
// ////////////////////////////////

// clear out all files and folders from build folder
gulp.task('build:cleanfolder',function(){
	del([
		'build/**'
		])
});


//  task to create build directory for all files
gulp.task('build:copy',['build:cleanfolder'],function(){
	return gulp.src('app/**/*/')
	.pipe(gulp.dest('build/'));
});

// task to remove unwanted build files
//list  all files and directories here that you dont want to include

gulp.task('build:remove',['build:copy','build:cleanfolder'],function(cb){
	del([
		'build/scss/',
		'build/js/!(*.min.js)'
		],cb);
});
gulp.task('build',['build:copy','build:remove']);

// ////////////////////////////////////////////////
// Styles Tasks
// ///////////////////////////////////////////////

gulp.task('styles', function() {
	gulp.src('app/scss/style.scss')
		.pipe(sass())
		.pipe(plumber())
		.pipe(autoprefixer('last 2 versions'))	
		.pipe(gulp.dest('app/css'))
		.pipe(reload({stream:true}));
	
});

// //////////////////////////////////
// browser-sync task
// ////////////////////////////////
gulp.task('browser-sync',function(){
	browserSync({
		server:{
			baseDir:"./app/"
		}
	});
});

//task to run build server for testing final app
gulp.task('build:serve',function(){
	browserSync({
		server:{
			baseDir:"./build/"
		}
	});
});



// //////////////////////////////////
// watch/scss task
// ////////////////////////////////

gulp.task('watch',function(){
gulp.watch('app/js/**/*.js',['scripts']);
gulp.watch('app/scss/**/*.scss',['styles']);

gulp.watch('app/**/*.html',['html']);

});

// //////////////////////////////////
// default task
// ////////////////////////////////

gulp.task('default',['scripts','styles','html','browser-sync','watch']);