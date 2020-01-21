import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import 'uikit/dist/css/uikit.css'
import Card from '../Card/Card'

function Display() {
  const QUERY = gql`
    {
      plan(
        fromPlace: "Espoontie 21, Espoo::60.218789,24.662693"
        toPlace: "Pohjoinen Rautatiekatu 25, Helsinki::60.169522,24.925878"
      ) {
        itineraries {
          walkDistance
          duration
          legs {
            mode
            startTime
            endTime
            from {
              lat
              lon
              name
              stop {
                code
                name
              }
            }
            to {
              lat
              lon
              name
            }
            distance
            legGeometry {
              length
            }
          }
        }
      }
    }
  `

  const { loading, err, data } = useQuery(QUERY)

  if (err) console.log(err)

  let show = null

  if (loading) {
    show = (
      <div
        className="uk-inline uk-width-1-1"
        style={{ height: `${window.innerHeight}px` }}
      >
        <div className="uk-position-center">
          <div uk-spinner="ratio: 8" />
        </div>
      </div>
    )
  } else {
    show = <Card itineraries={data.plan.itineraries}></Card>
  }

  return <div>{show}</div>
}

export default Display
