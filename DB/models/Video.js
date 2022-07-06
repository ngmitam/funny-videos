const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    es_indexed: true,
    ref: 'User',
  },

  url: {
    type: String,
    required: true,
    validate: {
      validator: function (url) {
        const YoutubeURLRegEx =
          /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        return YoutubeURLRegEx.test(url);
      },
      message: (props) => `${props.value} is not a valid YouTube link!`,
    },
  },

  disabled: {
    default: false,
    type: Boolean,
    es_indexed: true,
  },

  createdAt: {
    type: Number,
    default: () => Math.round(Date.now() / 1000),
    es_indexed: true,
  },
});

const Video = mongoose.models.Video || mongoose.model('Video', VideoSchema);

// Export video model
module.exports = Video;
