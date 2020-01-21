import React from 'react'
import 'uikit/dist/css/uikit.css'
import './Card.css'

function sort(objs) {
  return objs.sort((a, b) =>
    a.duration > b.duration ? 1 : b.duration > a.duration ? -1 : 0
  )
}

function Card(props) {
  let legs = sort(props.itineraries)[0].legs.map((leg, i) => {
    let stop = ''
    leg.from.stop === null ? (stop = '') : (stop = ' - ' + leg.from.stop.code)

    return (
      <p key={i}>
        <span>{new Date(leg.startTime).toLocaleString()}</span>
        <br />
        {leg.from.name}
        {stop}
        <br />
        <button className="uk-button uk-button-default">{leg.mode}</button>
        <br />
        {leg.to.name}
        <br />
        <span href="#">{new Date(leg.endTime).toLocaleString()}</span>
        <br />
      </p>
    )
  })

  return (
    <div>
      <nav className="uk-navbar-container" uk-navbar="">
        <div className="uk-navbar-center">
          <ul className="uk-navbar-nav">
            <li>
              <a href="#">
                Total time:{' '}
                {Math.floor(sort(props.itineraries)[0].duration / 60) +
                  ' mins ' +
                  Math.floor(sort(props.itineraries)[0].duration % 60) +
                  ' seconds'}
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <main>{legs}</main>
    </div>
  )
}

export default Card
