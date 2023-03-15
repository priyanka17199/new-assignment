 < tr >
                        <td>{each?.Id}</td>
                        <td>{team?.TID}</td>
                        <td>{each?.PFName}</td>
                        <td>{each?.TName}</td>
                        <td>{each?.SkillDesc}</td>
                        <td>{"$" + each?.Value}</td>
                        <td><img src={process.env.PUBLIC_URL + '/player-images/' + each?.Id + '.jpg'} height="50" width="50" /></td>
                        {
                          each.UpComingMatchesList.map((vsteam) => {
                            if (each?.TID === vsteam?.TID) {
                              return (
                                <td>{vsteam?.CCode + " VS " + vsteam?.VsCCode}</td>
                              );
                            }
                          })
                        }
                        {
                          each.UpComingMatchesList.map((index) => {
                            if (each?.TID === index?.TID) {
                              return (
                                <td>{index.MDate}</td>
                              );
                            }
                          })
                        }
                      </tr>