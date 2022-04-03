'use-strict';

const createLogger = require("hexo-log");

hexo.extend.filter.register('before_post_render', function (data) {
    const isToHandle = (data) => {
        var source = data.source;
        var ext = source.substring(source.lastIndexOf('.') + 1, source.length).toLowerCase();
        return ['md'].indexOf(ext) > -1;
    }

    if (!isToHandle(data)) {
        return data;
    }
    createLogger().log(data);

    const reg = /(\s+)\!\[\[(.+)\]\](\s+)/g;

    data.content = data.content
        .replace(reg, function (raw, start, content, end) {
            var nameAndTitle = content.split('|');
            if (nameAndTitle.length == 1) {
                return `${start}![](${content})${end}`;
            }
            return `${start}![${nameAndTitle[1]}](${nameAndTitle[0]})${end}`;
        });
    return data;

})