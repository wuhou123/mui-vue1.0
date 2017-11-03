var autoprefixer = require('autoprefixer'),
	combiner = require('stream-combiner2'), //整合 streams 来处理错误
	gulp = require('gulp'),
	named = require('vinyl-named'),
	path = require('path'),
	plugins = require('gulp-load-plugins')(),
	webpack = require('webpack'),
	webpackStream = require('webpack-stream');

var dest = 'build', proj = '.';

gulp.task('build', function() {
	gulp.start('styles','scriptsRelease','htmls', 'resources');
});

gulp.task('dev', ['watch'], function() {
	gulp.start('styles','scripts','htmls', 'resources');
});

gulp.task('xiaodou', function() {
	proj = '../cheways_xiaodou';
	dest = '../cheways_xiaodou/build';
	gulp.start('copy','styles','scripts','htmls', 'resources');
});

gulp.task('copy',function(){
	gulp.src('common/**/*.*')
		.pipe(plugins.changed(proj+'/common'))
		.pipe(gulp.dest(proj+'/common'));
	gulp.src('lib/**/*.*')
		.pipe(plugins.changed(proj+'/lib'))
		.pipe(gulp.dest(proj+'/lib'));
	gulp.src('index.html')
		.pipe(plugins.changed(proj))
		.pipe(gulp.dest(proj));
});

gulp.task('watch',function(){
	gulp.watch('src/**/*.@(css|styl)',['styles']);
	gulp.watch('src/**/*.@(html|pug)',['htmls']);
	gulp.watch('src/**/*.@(png|jpg|ico|svg|gif)',['resources']);
	gulp.watch(proj+'/special/*.styl', ['styles']);
});

gulp.task('styles',function(){
	gulp.src('src/**/*.css')
		.pipe(plugins.changed(dest))
		.pipe(plugins.postcss([ autoprefixer({cascade: false}) ]))
		.pipe(plugins.cleanCss())
		.pipe(gulp.dest(dest));
	gulp.src('src/**/*.styl')
		.pipe(plugins.changed(dest,{extension:'.css'}))
		.pipe(plugins.stylus({paths: [proj+'/special']}))
		.pipe(plugins.postcss([ autoprefixer({cascade: false}) ]))
		.pipe(gulp.dest(dest));
	gulp.src('common/common.styl')
		.pipe(plugins.changed(proj+'/common',{extension:'.css'}))
		.pipe(plugins.stylus({paths: [proj+'/special']}))
		.pipe(gulp.dest(proj+'/common'));
});

gulp.task('scriptsRelease',function(){
	gulp.src('src/**/*.js')
		.pipe(named(function(file) {
			return file.relative.slice(0, -path.extname(file.path).length)
		}))
		.pipe(webpackStream({
			output: {
				publicPath: '../'
			},
			resolve: {
				alias: {
					'vue$': 'vue/dist/vue.common.js',
					'cheways-vue$': '../../nopack/cheways-vue.js',
					'special': path.resolve(proj, 'special'),
				}
			},
			module: {
				rules: [
					{test: /\.vue$/, loader: 'vue-loader', options: {
						postcss: [require('autoprefixer')()]
					}},
					{test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
				]
			},
			plugins: [
				new webpack.DllReferencePlugin({
					context: __dirname,
					manifest: require('./lib/vendors-manifest.json')
				})
			],
		}, webpack))
		.pipe(plugins.uglify())
		.pipe(gulp.dest(dest));
});

gulp.task('scripts',function(){
	gulp.src('src/**/*.js')
		.pipe(named(function(file) {
			return file.relative.slice(0, -path.extname(file.path).length)
		}))
		.pipe(webpackStream({
			output: {
				publicPath: '../'
			},
			resolve: {
				alias: {
					'vue$': 'vue/dist/vue.common.js',
					'cheways-vue$': '../../nopack/cheways-vue.js',
					'special': path.resolve(proj, 'special'),
				}
			},
			module: {
				rules: [
					{test: /\.vue$/, loader: 'vue-loader', options: {
						postcss: [require('autoprefixer')()]
					}},
					{test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
				]
			},
			plugins: [
				new webpack.DllReferencePlugin({
					context: __dirname,
					manifest: require('./lib/vendors-manifest.json')
				})
			],
			watch: true,
		}, webpack))
		.pipe(gulp.dest(dest));
});

gulp.task('htmls',function(){
	gulp.src('src/**/*.html')
		.pipe(plugins.changed(dest))
		.pipe(plugins.htmlmin({
			collapseWhitespace: true, //压缩HTML
			minifyJS: true, //压缩页面JS
			minifyCSS: true, //压缩页面CSS
			removeComments: true, //清除HTML注释
			removeEmptyAttributes: true, //删除所有空格作属性值 <input id=" " /> ==> <input />
			removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
			removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
		}))
		.pipe(gulp.dest(dest));
	var combined = combiner.obj([
		gulp.src('src/**/*.pug'),
		plugins.changed(dest),
		plugins.pug({}),
		gulp.dest(dest)
	]);
	combined.on('error', console.error.bind(console));
});

gulp.task('htmls',function(){
	gulp.src('src/**/*.html')
		.pipe(plugins.changed(dest))
		.pipe(plugins.htmlmin())
		.pipe(gulp.dest(dest));
	var combined = combiner.obj([
		gulp.src('src/**/*.pug'),
		plugins.changed(dest,{extension:'.html'}),
		plugins.pug({}),
		gulp.dest(dest)
	]);
	combined.on('error', console.error.bind(console));
});

gulp.task('resources',function(){
	gulp.src('src/**/*.@(png|jpg|ico|svg|gif)')
		.pipe(plugins.changed(dest))
		.pipe(gulp.dest(dest));
});