import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './App.css'

function App() {
  const [ApiData, setApiData] = useState(false);
  const [SerarchPFName, setSerarchPFName] = useState("");
  const [SerarchTName, setSerarchTName] = useState("");

  const CallApi = () => {
    axios.get('https://api.npoint.io/20c1afef1661881ddc9c')
      .then((response) => {
        console.log(response.data);
        setApiData(response.data)
      })
  }

  useEffect(() => {
    CallApi();
  }, [])

  return (
    <>
      <div class="input_div">
        <input type="text" placeholder="Enter Player Name" onChange={(e) => setSerarchPFName(e.target.value)} />
        <input type="text" placeholder="Enter Team Name" onChange={(e) => setSerarchTName(e.target.value)} />
      </div>
      <div class='row row-cols-1 row-cols-md-4 g-4'>
        {
          ApiData && (ApiData.playerList).filter((each) => {
            if (SerarchPFName === "") {
              return each;
            } else if (each?.PFName.toLowerCase().includes(SerarchPFName.toLowerCase())) {
              return each;
            }
          }).map((each) => {
            return (
              ApiData && (ApiData.teamsList).filter((team) => {
                if (SerarchTName === "") {
                  return team;
                } else if (team?.OfficialName.toLowerCase().includes(SerarchTName.toLowerCase())) {
                  return team;
                }
              }).map((team) => {
                if (team?.TID === each?.TID) {
                  return (

                    <div class="col">
                      <div class="card h-100" >
                        <img src={process.env.PUBLIC_URL + '/player-images/' + each?.Id + '.jpg'} class="card-img-top" alt="..." />
                        <div class="card-body">
                          <h5 class="card-title">{each?.PFName}</h5>
                          <p class="card-text"><b>Team Name : </b>{each?.TName}</p>
                          <p class="card-text"><b>Player Skills : </b>{each?.SkillDesc}</p>
                          <p class="card-text"><b>Player Value : </b>{"$" + each?.Value}</p>
                          {
                            each.UpComingMatchesList.map((vsteam) => {
                              if (each?.TID === vsteam?.TID) {
                                return (
                                  <p class="card-text"><b>Match Details : </b>{vsteam?.CCode + " VS " + vsteam?.VsCCode}</p>
                                );
                              }
                            })
                          }
                          {
                            each.UpComingMatchesList.map((index) => {
                              if (each?.TID === index?.TID) {
                                return (
                                  <p class="card-text"><b>Upcoming Match Date : </b>{index.MDate}</p>
                                );
                              }
                            })
                          }
                        </div>
                      </div>
                    </div>
                  )
                }
              })
            );
          })
        }
      </div>

    </>
  )
}

export default App