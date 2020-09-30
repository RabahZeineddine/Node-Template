export const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Node Template',
            version: '1.0.0'
        },
    },
    apis: ['./?(src|server)/config/swagger/swagger.yaml', './?(src|server)/routers/**/*.yaml']
}
