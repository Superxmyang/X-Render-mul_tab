export const defaultGlobalSettings = {
    type: 'object',
    properties: {
        mul_tag: {
            type: 'any',
            widget: "mul_tag",
        },
        column: {
            title: '整体布局',
            type: 'number',
            enum: [1, 2, 3],
            enumNames: ['一行一列', '一行二列', '一行三列'],
            props: {
                placeholder: '默认一行一列'
            }
        }
    }
};