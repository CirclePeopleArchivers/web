module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Videos', {
        id: {
            type: Sequelize.STRING(16),
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
        title: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        view_count: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        like_count: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        dislike_count: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        upload_date: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        file_type: {
            type: Sequelize.STRING(16),
            allowNull: false,
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
    down: (queryInterface) => queryInterface.dropTable('Videos'),
};
