module.exports = {
  Query: {
    getMovieDetail: async (_source, { searchTerm }, { dataSources }) => {
      const data = await dataSources.MoviesAPI.getMovieDetail(searchTerm);
      const movie = {
        title: data.Title,
        year: data.Year,
        rated: data.Rated,
        runtime: data.Runtime,
        actors: data.Actors,
        awards: data.Awards,
        director: data.Director,
        plot: data.Plot,
        poster: data.Poster,
        genre: data.Genre,
        rating: data.imdbRating,
        metascore: data.Metascore,
      };
      return movie;
    },
    getMovieList: async (_source, { searchTerm }, { dataSources }) => {
      const data = await dataSources.MoviesAPI.getMovieList(searchTerm);
      const quiz = {
        title: searchTerm,
        createdAt: new Date().toISOString(),
      };
      quiz.items = data.map((d) => {
        return {
          question: d.Title,
          answer: d.Year,
          imdbId: d.imdbID,
          poster: d.Poster
        };
      });
      return quiz;
    },
  },
};

/*
 Possible Info to display on details
{Title: "Dog Day Afternoon", Year: "1975", Rated: "R", Released: "25 Dec 1975", Runtime: "125 min", …}
Actors: "Penelope Allen, Sully Boyar, John Cazale, Beulah Garrick"
Awards: "Won 1 Oscar. Another 13 wins & 20 nominations."
BoxOffice: "N/A"
Country: "USA"
DVD: "N/A"
Director: "Sidney Lumet"
Genre: "Biography, Crime, Drama, Thriller"
Language: "English"
Metascore: "86"
Plot: "Three amateur bank robbers plan to hold up a bank. A nice simple robbery: Walk in, take the money, and run. Unfortunately, the supposedly uncomplicated heist suddenly becomes a bizarre nightmare as everything that could go wrong does."
Poster: "https://m.media-amazon.com/images/M/MV5BODExZmE2ZWItYTIzOC00MzI1LTgyNTktMDBhNmFhY2Y4OTQ3XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"
Production: "Artists Entertainment Complex"
Rated: "R"
Ratings: (3) [{…}, {…}, {…}]
Released: "25 Dec 1975"
Response: "True"
Runtime: "125 min"
Title: "Dog Day Afternoon"
Type: "movie"
Website: "N/A"
Writer: "Frank Pierson (screenplay), P.F. Kluge (based upon a magazine article by), Thomas Moore (based upon a magazine article by)"
Year: "1975"
imdbID: "tt0072890"
imdbRating: "8.0"
imdbVotes: "231,221"
*/
