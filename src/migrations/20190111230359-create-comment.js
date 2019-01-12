module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Comments', {
        id: {
            type: Sequelize.STRING(255),
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
        video_id: {
            type: Sequelize.STRING(16),
            allowNull: false,
        },
        parent_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
        },
        content: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        like_count: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        author_id: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        author_name: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        published_date: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        updated_date: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
    }),
    down: (queryInterface) => queryInterface.dropTable('Comments'),
};
