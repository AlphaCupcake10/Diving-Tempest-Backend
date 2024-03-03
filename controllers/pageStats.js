const PageStats = require('../models/pageStats');

const incrementVisits = async (req, res) => {
    try
    {
        const pageStats = await PageStats.findOne({});

        if (!pageStats)
        {
            pageStats = new PageStats({visits: 0});
        }

        pageStats.visits++;
        await pageStats.save();
        res.status(200).json(pageStats);
    }
    catch (err)
    {
        res.status(400).send(err.message);
    }
}

const getPageStats = async (req, res) => {
    try
    {
        const pageStats = await PageStats.findOne({});
        res.status(200).json(pageStats);
    }
    catch (err)
    {
        res.status(400).send(err.message);
    }
}

module.exports = { incrementVisits, getPageStats };