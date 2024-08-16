const News = require('../models/newsSchema');

const createNews = async (req, res) => {
    try {
        const { title, detail, writer, tags } = req.body;

        const newNews = await News({
            title, detail, writer, tags
        });


        const saveUser = await newNews.save();
        res.json(saveUser);

    } catch (error) {
        console.error('News Error:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

const singleNews = async (req, res) => {
    try {
        const singleNews = await News.findById(req.params.id);

        if (!singleNews) {
            res.status(500).json("There is no News with this Id")
        }

        res.status(200).json(singleNews);

    } catch (error) {
        console.error('News Error:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

const allNews = async (req, res) => {
    try {
        const singleNews = await News.find();

        if (!singleNews) {
            res.status(500).json("There is no News ")
        }

        res.status(200).json(singleNews);

    } catch (error) {
        console.error('News Error:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

const updateNews = async (req, res) => {
    try {
        const { title, detail, writer, tags } = req.body;
        const { id } = req.params;

        const updatedNews = await News.findByIdAndUpdate(
            id,
            { title, detail, writer, tags },
            { new: true }
        );

        if (!updatedNews) {
            return res.status(404).json({ message: "News not found" });
        }

        res.status(200).json(updatedNews);

    } catch (error) {
        console.error('News Error:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};


const deleteNews = async (req, res) => {
    try {
        // const { id } = req.params;
        const singleNews = await News.findByIdAndDelete(req.params.id);

        if (!singleNews) {
            res.status(500).json("There is no News ")
        }

        res.status(200).json("Delete successfully");

    } catch (error) {
        console.error('News Error:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};


module.exports = {
    createNews,
    singleNews,
    allNews,
    updateNews,
    deleteNews
}
