/**
 * Video model
 */

module.exports = (sequelize, DataTypes) => {
    const Video = sequelize.define('Video', {
        id: {
            type: DataTypes.CHAR(16),
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
        title: {
            type: DataTypes.CHAR(255),
            allowNull: false,
        },
        view_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        like_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        dislike_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        upload_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        file_type: {
            type: DataTypes.CHAR(16),
            allowNull: false,
        },
    });

    return Video;
};
