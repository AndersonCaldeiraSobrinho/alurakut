import React from 'react';
import styled from 'styled-components';



export function TestimonialBox({ testemunho }) {
  return (
    
      <ul>
      {testemunho.map((itemAtual) => {
        return (
          <li key={itemAtual.id}>
            <span>{itemAtual.title}</span>
          </li>
        )
      })}

      </ul>

  )
}


