import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import Search from "./common/search";
class Movies extends Component {
  state = {
    movies: [],
    currentPage: 1,
    pageSize: 4,
    genres: [],
    sortColumn: { path: "title", order: "asc" },
    searchText: "",
    selectedGenre: null,
  };
  async componentDidMount() {
    const genres = [{ name: "All Genres" }, ...(await getGenres())];
    const movies = await getMovies();
    this.setState({ movies, genres });
  }
  handleDelete = async (movie) => {
    // deleteMovie(movie._id);
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (error) {
      this.setState({ movie: originalMovies });
    }
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ searchText: "", selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({
      searchText: query,
      selectedGenre: null,
      currentPage: 1,
    });
  };

  getPageData = () => {
    const {
      selectedGenre,
      movies: allMovies,
      pageSize,
      currentPage,
      sortColumn,
      searchText,
    } = this.state;
    const searched =
      searchText !== ""
        ? allMovies.filter((m) =>
            m.title.toLowerCase().startsWith(searchText.toLowerCase())
          )
        : allMovies;
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;
    const final = searchText !== "" ? searched : filtered;
    const sorted = _.orderBy(final, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: final.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      genres,
      sortColumn,
      searchText,
    } = this.state;
    const { user } = this.props;

    if (count === 0) {
      return <p>There is no movie in the database</p>;
    }

    const { totalCount, data } = this.getPageData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            clicked={this.handleGeneres}
            items={genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={this.state.selectedGenre}
          />
        </div>
        <div className="col">
          {user && (
            <Link
              to="/movies/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Movie
            </Link>
          )}

          <p>Showing {totalCount} movies in the database</p>
          <Search value={searchText} onChange={this.handleSearch} />
          <MoviesTable
            movies={data}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            user={user}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
