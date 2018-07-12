CKEDITOR.editorConfig = function (config) {
  // Define changes to default configuration here. For example:
  // config.language = 'fr';
  // config.uiColor = '#AADC6E';
  config.width = 550;
  config.toolbar = 'MyToolbar';
  config.font_names = '宋体/SimSun;新宋体/NSimSun;仿宋/FangSong;楷体/KaiTi;仿宋_GB2312/FangSong_GB2312;'+
    '楷体_GB2312/KaiTi_GB2312;黑体/SimHei;华文细黑/STXihei;华文楷体/STKaiti;华文宋体/STSong;华文中宋/STZhongsong;'+
    '华文仿宋/STFangsong;华文彩云/STCaiyun;华文琥珀/STHupo;华文隶书/STLiti;华文行楷/STXingkai;华文新魏/STXinwei;'+
    '方正舒体/FZShuTi;方正姚体/FZYaoti;细明体/MingLiU;新细明体/PMingLiU;微软雅黑/Microsoft YaHei;微软正黑/Microsoft JhengHei;'+
    'Arial Black/Arial Black;'+ config.font_names;
  config.removePlugins = 'elementspath';
  config.image_previewText=' '; //预览区域显示内容
  config.extraPlugins = 'image';
  config.filebrowserUploadUrl = 'https://www.liangzixiaoying.cn/activity/mingXinImg';
  config.toolbar_MyToolbar =
    [
      ['Undo', 'Redo', '-', 'SelectAll', 'RemoveFormat'],
      ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', 'Blockquote', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
      ['Image'],
      '/',
      ['Format', 'Font', 'FontSize'],
      ['TextColor', 'BGColor'],
      ['Bold', 'Italic', 'Underline', 'Strike', '-', 'Subscript', 'Superscript']
    ];
};
