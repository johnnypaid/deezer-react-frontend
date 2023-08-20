import axios from "axios";
import { useState, useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import TrackList from "./TrackList";
import { ListTracksProps } from "../utils/constants";

const SearchForm = () => {
  const [input, setInput] = useState("");
  let [track, setTrack] = useState<any>();

  useEffect(() => {
    setInput(input);
  });

  const getTrack = async (e: any) => {
    e.preventDefault();
    await axios
      .get(`${BASE_URL}/${input}`)
      .then((res) => {
        console.log(res);
        if (res.data.hasOwnProperty("error")) {
          return;
        }
        setTrack(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // console.log(track);

  return (
    <>
      <section className="py-5 text-center container" key={input}>
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Artist Track Search</h1>
            <div className="container bg-light rounded">
              <form className="p-3">
                <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                  <label className="visually-hidden">Email address</label>
                  <input
                    className="form-control"
                    type="search"
                    placeholder="Track ID"
                    aria-label="Search"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                  <button
                    className="btn btn-primary"
                    type="submit"
                    onClick={getTrack}
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      {track !== undefined && (
        <TrackList
          songTitle={track.title_short}
          artistName={track.artist.name}
          duration={track.duration}
          image={track.artist.picture_big}
          albumTitle={track.album.title}
          preview={track.preview}
          trackList={track.artist.tracklist}
        />
      )}
    </>
  );
};

export default SearchForm;
