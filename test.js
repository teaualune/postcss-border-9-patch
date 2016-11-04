import postcss from 'postcss';
import test    from 'ava';

import plugin from './';

function run(t, input, output, opts = { }) {
    return postcss([ plugin(opts) ]).process(input)
        .then( result => {
            t.deepEqual(result.css, output);
            t.deepEqual(result.warnings().length, 0);
        });
}

test('example usage (single width)', t => {
    return run(t, `.nine {
            border-9-patch: url('bg.png') 100px 200px 20px;
        }`, `.nine {
            border-style: solid;
            border-color: transparent;
            border-image-source: url('bg.png');
            border-width: 20px;
            border-image-slice: 20.00% 10.00%;
        }`);
});

test('example usage (top right bottom left)', t => {
    return run(t, `.nine {
            border-9-patch: url('bg.png') 110px 114px 52px 50px 50px 48px;
        }`, `.nine {
            border-style: solid;
            border-color: transparent;
            border-image-source: url('bg.png');
            border-width: 52px 50px 50px 48px;
            border-image-slice: 45.61% 45.45% 43.86% 43.64%;
        }`);
});
