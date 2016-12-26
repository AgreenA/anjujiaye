/**
 * Created by Administrator on 2016/12/8.
 */
//首先引入gulp模块
var gulp=require('gulp');
//引入stylus插件
//var stylus=require('gulp-stylus');
//引入压缩css文件
var minifycss=require('gulp-minify-css');
//引入压缩js文件
var uglify=require('gulp-uglify');


var browserSync=require('browser-sync').create();
var reload=browserSync.reload;
var nodemon=require('gulp-nodemon');

gulp.task('nodemon',function(ab){
	var ft=false;
	return nodemon({
		script:'./app.js'
	} ).on("start",function(){
		if(!ft){
			ab();
			ft = true;
		}
	})
});
gulp.task('browserSync',['nodemon'],function(){
	browserSync.init({
		proxy:{
			target:'http://127.0.0.1:16947'
		},
		files:['*'],
		port:9888,
		open:false
	})
});

//gulp.task('stylus',function(){
//	//获取要编译的文件
//	//多个文件
//	//gulp.src(['./stylus/index.styl','./stylus/css.styl']);
//	//所有文件 不包含子目录
//	//gulp.src('./stylus/*.styl');
//	//指定一个目录及所有子目录下的文件
//	return gulp.src('./stylus/**/*.styl')
//	//执行stylus编译
//	           .pipe(stylus())
//	//输出编译后的文件
//	           .pipe(gulp.dest("./static/css"))
//});

//压缩css文件
gulp.task('minifycss',function(){//添加前置执行任务stylus
	return gulp.src('./static/css/**/*.css')
		       .pipe(minifycss())
		       .pipe(gulp.dest("./static/mincss/"))
});

//压缩js文件
gulp.task('uglify',function(){//添加前置执行任务stylus
	return gulp.src('./static/js/**/*.js')
		.pipe(uglify())
		.pipe(gulp.dest("./static/minjs/"))
});

//动态监听 监听文件变化 并拷贝到指定目录
gulp.task('watcher',['browserSync','uglify'],function(){
	//gulp.watch( './stylus/**/*.styl', [ 'stylus'] );

	gulp.watch('./static/js/**/*.js',['uglify']);

	gulp.watch(['./static/css/**/*.css','./static/minjs/**/*.js' ]).on('change',function(){
		reload();
	})
});

//执行多个文件
//gulp.task('logs',function(){
//	console.log('this is log')
//});
//
//gulp.task('es6',function(){
//	console.log('this is es6')
//});
//
//gulp.task('css6',function(){
//	console.log('this is css6')
//});
//gulp.task('minijs',['es6'],function(){//这样可以先执行es6之后再minijs执行
//	console.log('this is minijs')
//})
////可以同步执行多个文件
//gulp.task('all',['logs','es6','css6','minijs'],function(){
//	console.log('this is all');
//});

//创建一个default文件（表示Gulp默认文件 所以在命令框输入gulp也可以执行）
gulp.task('default',function(){
	console.log('this default')
});




