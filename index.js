var postcss = require('postcss');

var ruleName = 'border-9-patch';

function pxStringToNumber(pxString) {
    return pxString.substring(0, pxString.length - 2);
}

module.exports = postcss.plugin('postcss-border-9-patch', function () {
    return function (root) {
        root.walkRules(function (rule) {
            rule.each(function (declaration) {
                // declaration.value.split(' ');
                if (declaration.prop !== ruleName) return;

                var values = declaration.value.split(' ')
                    .filter(function (value) {
                        return value && value.length > 0;
                    });

                declaration.cloneBefore({
                    prop: 'border-style',
                    value: 'solid'
                });
                declaration.cloneBefore({
                    prop: 'border-color',
                    value: 'transparent'
                });

                declaration.cloneBefore({
                    prop: 'border-image-source',
                    value: values.shift()
                });

                var imageWidth = pxStringToNumber(values.shift());
                var imageHeight = pxStringToNumber(values.shift());

                var borderWidths = values.map(pxStringToNumber);
                var borderSlices;
                switch (borderWidths.length) {
                case 1:
                    borderSlices = [
                        borderWidths[0] / imageWidth,
                        borderWidths[0] / imageHeight
                    ];
                    break;
                case 2:
                    borderSlices = [
                        borderWidths[0] / imageWidth,
                        borderWidths[1] / imageHeight
                    ];
                    break;
                case 3:
                    borderSlices = [
                        borderWidths[0] / imageHeight,
                        borderWidths[1] / imageWidth,
                        borderWidths[2] / imageHeight
                    ];
                    break;
                case 4:
                    borderSlices = [
                        borderWidths[0] / imageHeight,
                        borderWidths[1] / imageWidth,
                        borderWidths[2] / imageHeight,
                        borderWidths[3] / imageWidth
                    ];
                    break;
                default:
                    borderSlices = [];
                    break;
                }

                declaration.cloneBefore({
                    prop: 'border-width',
                    value: borderWidths.map(function (width) {
                        return width + 'px';
                    }).join(' ')
                });
                declaration.cloneBefore({
                    prop: 'border-image-slice',
                    value: borderSlices.map(function (slice) {
                        return parseFloat(slice * 100).toFixed(2) + '%';
                    }).join(' ')
                });

                declaration.remove();
            });
        });
    };
});
