import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledDogsSection = styled.section`
  max-width: 600px;
  margin: 0 auto 100px;
  text-align: center;

  @media (max-width: 768px) {
    margin: 0 auto 50px;
  }

  .overline {
    display: block;
    margin-bottom: 20px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 400;

    &:before {
      bottom: 0;
      font-size: var(--fz-sm);
    }

    &:after {
      display: none;
    }
  }

  .title {
    font-size: clamp(40px, 5vw, 60px);
  }

  img {
    object-fit: contain;
    loading: lazy;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Dogs = () => {
  const [imageUrl, setImageUrl] = useState('../../images/me.jpg');
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const breeds = {
    affenpinscher: [],
    african: [],
    airedale: [],
    akita: [],
    appenzeller: [],
    australian: ['kelpie', 'shepherd'],
    bakharwal: ['indian'],
    basenji: [],
    beagle: [],
    bluetick: [],
    borzoi: [],
    bouvier: [],
    boxer: [],
    brabancon: [],
    briard: [],
    buhund: ['norwegian'],
    bulldog: ['boston', 'english', 'french'],
    bullterrier: ['staffordshire'],
    cattledog: ['australian'],
    cavapoo: [],
    chihuahua: [],
    chippiparai: ['indian'],
    chow: [],
    clumber: [],
    cockapoo: [],
    collie: ['border'],
    coonhound: [],
    corgi: ['cardigan'],
    cotondetulear: [],
    dachshund: [],
    dalmatian: [],
    dane: ['great'],
    danish: ['swedish'],
    deerhound: ['scottish'],
    dhole: [],
    dingo: [],
    doberman: [],
    elkhound: ['norwegian'],
    entlebucher: [],
    eskimo: [],
    finnish: ['lapphund'],
    frise: ['bichon'],
    gaddi: ['indian'],
    germanshepherd: [],
    greyhound: ['indian', 'italian'],
    groenendael: [],
    havanese: [],
    hound: ['afghan', 'basset', 'blood', 'english', 'ibizan', 'plott', 'walker'],
    husky: [],
    keeshond: [],
    kelpie: [],
    kombai: [],
    komondor: [],
    kuvasz: [],
    labradoodle: [],
    labrador: [],
    leonberg: [],
    lhasa: [],
    malamute: [],
    malinois: [],
    maltese: [],
    mastiff: ['bull', 'english', 'indian', 'tibetan'],
    mexicanhairless: [],
    mix: [],
    mountain: ['bernese', 'swiss'],
    mudhol: ['indian'],
    newfoundland: [],
    otterhound: [],
    ovcharka: ['caucasian'],
    papillon: [],
    pariah: ['indian'],
    pekinese: [],
    pembroke: [],
    pinscher: ['miniature'],
    pitbull: [],
    pointer: ['german', 'germanlonghair'],
    pomeranian: [],
    poodle: ['medium', 'miniature', 'standard', 'toy'],
    pug: [],
    puggle: [],
    pyrenees: [],
    rajapalayam: ['indian'],
    redbone: [],
    retriever: ['chesapeake', 'curly', 'flatcoated', 'golden'],
    ridgeback: ['rhodesian'],
    rottweiler: [],
    saluki: [],
    samoyed: [],
    schipperke: [],
    schnauzer: ['giant', 'miniature'],
    segugio: ['italian'],
    setter: ['english', 'gordon', 'irish'],
    sharpei: [],
    sheepdog: ['english', 'indian', 'shetland'],
    shiba: [],
    shihtzu: [],
    spaniel: ['blenheim', 'brittany', 'cocker', 'irish', 'japanese', 'sussex', 'welsh'],
    spitz: ['indian', 'japanese'],
    springer: ['english'],
    stbernard: [],
    terrier: [
      'american',
      'australian',
      'bedlington',
      'border',
      'cairn',
      'dandie',
      'fox',
      'irish',
      'kerryblue',
      'lakeland',
      'norfolk',
      'norwich',
      'patterdale',
      'russell',
      'scottish',
      'sealyham',
      'silky',
      'tibetan',
      'toy',
      'welsh',
      'westhighland',
      'wheaten',
      'yorkshire',
    ],
    tervuren: [],
    vizsla: [],
    waterdog: ['spanish'],
    weimaraner: [],
    whippet: [],
    wolfhound: ['irish'],
  };

  async function handleDogImage() {
    const randomBreed = function(breeds) {
      return Object.keys(breeds)[Math.floor(Math.random() * Object.keys(breeds).length)];
    };
    const randomSubBreed = function(key) {
      const sb = breeds[key];
      if (sb && sb.length > 0) {
        return sb[Math.floor(Math.random() * sb.length)];
      }
      return '';
    };
    const breed = randomBreed(breeds);
    const subBreed = randomSubBreed(breed);
    let url = `https://dog.ceo/api/breed/${breed}/`;
    if (subBreed.length > 0) {
      url += `${subBreed}/`;
    }
    url += 'images/random';
    try {
      const response = await fetch(url);
      const result = await response.json();
      if (result && result.message && result.status && result.status === 'success') {
        setImageUrl(result.message);
      }
    } catch (error) {
      setImageUrl('https://images.dog.ceo/breeds/hound-english/n02089973_1030.jpg');
    }
  }

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  useEffect(() => {
    handleDogImage();
  }, []);

  return (
    <StyledDogsSection id="dogs" ref={revealContainer}>
      <h2 className="numbered-heading overline">
        Feeling Lucky?
        <span role="img" aria-label="dog-leash">
          🐾
        </span>
      </h2>

      <h2 className="title">
        Happiness is a warm puppy
        <span role="img" aria-label="dog-face">
          🐶
        </span>
      </h2>
      <div>
        <img src={imageUrl} alt="Dog" width={500} height={500}></img>
      </div>
      <button className="email-link" onClick={() => handleDogImage()}>
        Show me
        <span role="img" aria-label="dog-leash">
          🐕‍🦺
        </span>
      </button>
    </StyledDogsSection>
  );
};

export default Dogs;
