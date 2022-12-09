const path = require('path'); // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require('html-webpack-plugin'); // подключаем плагин html
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry:  './src/pages/index.js' , // указали первое место, куда заглянет webpack, — файл index.js в папке src
  output: {
    clean: true, // очищаем папку dist при сборке
                 // https://webpack.js.org/guides/output-management/#cleaning-up-the-dist-folder
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js', // имя файла после зброкм
    publicPath: '' // не знаю зачем, но явно надо
  }, // указали в какой файл будет собираться весь js и дали ему имя
  optimization: {
    minimize: true, // уменьшаем развмеры файлов. Удаляем пробелы и переносы строк
  },
  mode: 'development', // добавили режим разработчика
  devServer: {
    watchFiles: ['./**'],
    static: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
    compress: true, // это ускорит загрузку в режиме разработки
    port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
    open: true, // сайт будет открываться сам при запуске npm run dev
    hot: true // горячее обноваление браузера после любых изменений
  },
  module: {
    rules: [ // rules — это массив правил
      // добавим в него объект правил для бабеля
      {
        // регулярное выражение, которое ищет все js файлы
        // используем bable-loader https://webpack.js.org/loaders/babel-loader/
        // уменьшаем размер файла
        test: /\.js$/,
        // при обработке этих файлов нужно использовать babel-loader
        use: 'babel-loader',
        // исключает папку node_modules, файлы в ней обрабатывать не нужно
        exclude: '/node_modules/'
      },
      {
        // обрабатываем единственный html файл, на предмет вхождения картинок.
        // https://webpack.js.org/loaders/html-loader/
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        // только шрифиты
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          // сохраняем имя
          filename: 'fonts/[name][ext]'
        }
      },
      {
        // только картинки
        test: /\.(png|svg|jpg|gif)$/,
        type: 'asset/resource',
        generator: {
          // сохраняем имя
          filename: 'images/[name][ext]'
        }
      },
      {
        // применять это правило только к CSS-файлам
        test: /\.css$/,
        // при обработке этих файлов нужно использовать
        // MiniCssExtractPlugin.loader и css-loader
        // https://webpack.js.org/plugins/mini-css-extract-plugin/
        use: [MiniCssExtractPlugin.loader, {
          loader: 'css-loader'
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html' // путь к файлу index.html
    }),
    new MiniCssExtractPlugin()
  ]
}
