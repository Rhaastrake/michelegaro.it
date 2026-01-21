module.exports = function (eleventyConfig) {
  // ✅ Copia diretta delle cartelle
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/php/!(configExample.php)");

  // ✅ File di configurazione
  // Utili per l'indicizzazione

  // eleventyConfig.addPassthroughCopy("src/manifest.json");
  // eleventyConfig.addPassthroughCopy("src/browserconfig.xml");
  // eleventyConfig.addPassthroughCopy("src/robots.txt");

  // ✅ Copia tutto il contenuto di public nella root
  eleventyConfig.addPassthroughCopy({ "src/public": "/" });

  return {
    dir: {
      input: "src",
      includes: "partials",
    },
  };
};
