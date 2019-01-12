/**
 * Video model
 */

module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        id: {
            type: DataTypes.STRING(255),
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
        video_id: {
            type: DataTypes.STRING(16),
            allowNull: false,
        },
        parent_id: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        like_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        author_id: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        author_name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        published_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updated_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    });

    return Comment;
};
