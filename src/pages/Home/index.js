import React, { Component } from "react";
import {} from "react-router-dom";
import "./style.css";
import { getTiles } from "../../api";
import { debounce } from "lodash";
import clsx from "clsx";

class HomePage extends Component {
  state = {
    tileDetails: [],
    wrapperWidth: 0,
    selectedTileId: null
  };

  async componentDidMount() {
    this.setSelectedTile();
    this.setWrapperWidth();
    this.fetchTiles();
    window.addEventListener("resize", this.debouncedSetWrapperWidth);
  }

  setSelectedTile = () => {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    this.setState({
      selectedTileId: id
    });
  };

  isTileSelected = id => {
    const { selectedTileId } = this.state;
    return selectedTileId === `${id}`;
  };

  fetchTiles = async () => {
    const tileDetails = await getTiles();

    this.setState({
      tileDetails
    });
  };

  handleLogout = () => {
    localStorage.setItem("isLoggedIn", false);
    window.location = "/";
  };

  handleImageLoad(event) {
    const id = event.target.id;
    const height = event.target.getBoundingClientRect().height;
    const $tile = document.querySelector(`#tile-${id}`);
    $tile.style.gridRowEnd = `span ${Math.floor(height / 10)}`;
    $tile.querySelector(".placeholder").classList.add("hide");
  }

  handleImageClick = id => {
    this.setState({
      selectedTileId: id
    });
    this.props.history.push(`/home/${id}`);
  };

  setWrapperWidth = () => {
    const width = window.innerWidth;
    const numberOfColumns = Math.floor(width / 300);
    this.setState({ wrapperWidth: numberOfColumns * 300 });
  };

  debouncedSetWrapperWidth = debounce(this.setWrapperWidth, 300);

  render() {
    const { tileDetails, wrapperWidth } = this.state;

    return (
      <div>
        <div className="header">
          <div className="logo">Brick N Bolt</div>
          <button className="log-out" onClick={this.handleLogout}>
            Logout
          </button>
        </div>
        <div className="page-body">
          <div className="tiles-wrapper" style={{ width: `${wrapperWidth}px` }}>
            {tileDetails.map(({ id, farm, server, secret, title }) => (
              <div
                id={`tile-${id}`}
                key={id}
                className={clsx({ selected: this.isTileSelected(id) }, "tile")}
              >
                <img
                  onClick={() => this.handleImageClick(id)}
                  className={clsx({ selected: this.isTileSelected(id) })}
                  id={`${id}`}
                  onLoad={this.handleImageLoad}
                  alt={title}
                  src={`https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`}
                />
                <div className="placeholder" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.debouncedSetWrapperWidth);
  }
}

export default HomePage;
