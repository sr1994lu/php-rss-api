/**
 * RSS表示機能
 *
 * 描画する直前に以下を書く
 * <script src="https://js.cybozu.com/momentjs/2.15.1/moment.min.js"></script>
 * <script
 *   src="https://js.cybozu.com/momentjs/2.15.1/moment-with-locales.min.js">
 * </script>
 * <script
 *   src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js">
 * </script>
 * <script defer src="this"></script>
 * <div id="rss"></div>
 */

$(function() {
  $.ajax({
    url: 'rss.php',
    xmlType: 'xml',
    success: function(xml) {
      var row = 1;
      var data = [];
      var nodeName;
      // id="rss"の要素に描画します
      var output = $('#rss');
      $(xml).find('item').each(function() {
        data[row] = {};
        $(this).children().each(function() {
          nodeName = $(this)[0].nodeName;
          data[row][nodeName] = {};
          attributes = $(this)[0].attributes;
          for (var i in attributes) {
            data[row][nodeName][attributes[i].name] = attributes[i].value;
          }
          data[row][nodeName]['text'] = $(this).text();
        });
        row++;
      });

      output.wrapInner('<ul></ul>');
      for (i in data) {
        /**
         * RSSの描画
         * @param {int} 表示件数
         */
        if (i <= 3) {
          output.find('ul').append(
              '<li class=\'rss\'>' +
              '<span class=\'rss__date\'>' +
              // powered by momentjs
              // 整形済み日付フォーマット
              moment(data[i].pubDate.text.substr(0, 16),
                  'ddd, DD MMM YYYY').format('YYYY.MM.DD') +
              '</span>' +
              '<a class=\'rss__title\' href="' +
              data[i].link.text +
              '">' +
              // 記事タイトル
              data[i].title.text +
              '</a>' +
              // 記事内容の描画
              //"<span class='rss__desc'>" +
              //  data[i].description.text. +
              //'</span>' +
              '</li>',
          );
        } else {
          return false;
        }
      }
    }  // successed
  });
});
