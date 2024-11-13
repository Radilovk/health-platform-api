// articlesController.js - Controler for managing articles functionality in the api.

const getArticles = async (req, res) => {
  try {
    const articles = await ArticleModel.findAll();
    res.status(200).json(articles);
  } catch (error) {
    res.status(400).json({ error: 'Articles not found' });
  }
};

export { getArticles };
