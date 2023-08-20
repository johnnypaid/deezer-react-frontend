import { BASE_URL, BASE_URL_ALBUM, ListTracksProps } from "../utils/constants";
import AudioPlayer from "./AudioPlayer";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

const TrackList = ({
  songTitle,
  artistName,
  duration,
  image,
  albumTitle,
  preview,
  trackList,
}: ListTracksProps) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let [trackListData, setTrackList] = useState<any>();
  let [data, setData] = useState<any>();
  let [album, setAlbum] = useState<any>([]);

  console.log(trackList);

  const getTrackList = async () => {
    let tempAlbum: number[] = [];
    await axios
      .post(`${BASE_URL}/list`, { url: trackList })
      .then((res) => {
        if (res.data.hasOwnProperty("error")) {
          return;
        }
        setData(res);
        setTrackList(
          res.data.data
            .sort((a: { rank: number }, b: { rank: number }) => a.rank - b.rank)
            .slice(0, 5)
        );

        console.log(trackListData);
      })
      .then(() => {
        if (trackListData.length) {
          for (let i = 0; i < trackListData.length; i++) {
            tempAlbum.push(trackListData[i].album.id);
          }

          getAlbumData(tempAlbum);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAlbumData = async (id: number[]) => {
    let tempData: any = [];
    let newTemp: any = [];

    console.log(id);
    if (id.length) {
      for (let i = 0; i < id.length; i++) {
        await axios
          .get(`${BASE_URL_ALBUM}/${id[i]}`)
          .then((res) => {
            // console.log(res.data);
            tempData.push(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }

      //console.log(tempData);
    }

    if (tempData.length > 0) {
      newTemp = trackListData;
      for (let i = 0; i < tempData.length; i++) {
        newTemp[i].release_date = tempData[i].release_date;
        newTemp[i].fans = tempData[i].fans;
      }
      console.log(newTemp);

      setTrackList(newTemp);
      console.log(trackListData);
    }
  };

  return (
    <div className="album py-5 bg-body-tertiary">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4">
            <div className="card shadow">
              <img
                className="bd-placeholder-img card-img-top object-fit-fill"
                width="100%"
                height="225"
                src={image}
                role="img"
                aria-label="Placeholder: Thumbnail"
              />
              <div className="card-body">
                <figure>
                  <blockquote className="blockquote">
                    <p>{songTitle}</p>
                  </blockquote>
                  <figcaption className="blockquote-footer">
                    <cite title="Source Title">{artistName}</cite>
                  </figcaption>
                </figure>
                <div className="d-flex justify-content-between align-items-center">
                  <Button
                    variant="primary"
                    onClick={() => {
                      handleShow();
                      getTrackList();
                    }}
                  >
                    More Info
                  </Button>

                  <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                    centered
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Top 5 Tracks</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      {trackListData !== undefined && (
                        <ol className="list-group list-group-numbered">
                          {trackListData.map((item: any, index: any) => (
                            <li
                              className="list-group-item d-flex justify-content-between align-items-start"
                              key={index}
                            >
                              <div className="ms-2 me-auto">
                                <div className="fw-bold">
                                  {item.title_short}
                                </div>
                                Album: {item.album.title}
                                <div className="">
                                  Released: <small>{item.release_date}</small>
                                </div>
                                <div className="">
                                  Fans: <small>{item.fans}</small>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ol>
                      )}
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>

                  <small className="text-body-secondary">
                    duration: <strong>{duration} sec</strong>
                  </small>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-8 d-none d-md-block">
            <div className="jumbotron">
              <div className="col-sm-8 mx-auto mt-5">
                <figure>
                  <blockquote className="blockquote">
                    <h5>{albumTitle}</h5>
                  </blockquote>
                  <figcaption className="blockquote-footer">
                    <cite title="Source Title">{artistName}</cite>
                  </figcaption>
                </figure>
                <div className="py-3">
                  <AudioPlayer preview={preview} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackList;
