import React, { useState, useEffect, useRef } from 'react'
import './main.scss';
import { FormEstabelecimento, FormLocalizacao, FormContato, FormHorario } from '../../basicosComponents/Forms';


const Main = () => {
  return (
    <section className='main'>
      <FormEstabelecimento/>
      <FormLocalizacao/>
      <FormContato/>
      <FormHorario/>
    </section>
  )
}

export default Main