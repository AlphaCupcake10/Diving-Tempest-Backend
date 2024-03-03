const PageStats = require('../models/pageStats');

const incrementUniqueVisits = async () => {
    try
    {
        let pageStats = await PageStats.findOne({});

        if (!pageStats)
        {
            pageStats = new PageStats({ uniqueVisits: 0, dailyVisits: 0 });
        }

        pageStats.uniqueVisits++;
        await pageStats.save();
    }
    catch (err)
    {
        console.log(err.message);
    }
}

const incrementDailyVisits = async () => {
    try
    {
        let pageStats = await PageStats.findOne({});

        if (!pageStats)
        {
            pageStats = new PageStats({ uniqueVisits: 0, dailyVisits: 0 });
        }

        pageStats.dailyVisits++;
        await pageStats.save();
    }
    catch (err)
    {
        console.log(err.message);
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

module.exports = { getPageStats , incrementUniqueVisits, incrementDailyVisits};