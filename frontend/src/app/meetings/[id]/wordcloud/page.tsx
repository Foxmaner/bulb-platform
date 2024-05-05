"use client";
import QRCodeWindow from "app/components/QrCode";
import React, { useEffect, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
const WordCloud = dynamic(() => import('app/components/WordCloud'), { ssr: false });

function generateData(str: string) {
  const words = str.split(' ');
  const wordCount: { [key: string]: number } = {};

  words.forEach(word => {
    if (wordCount[word]) {
      wordCount[word]++;
    } else {
      wordCount[word] = 1;
    }
  });

  return Object.entries(wordCount).map(([text, value]) => ({ text, value }));
}
let sampleString = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tellus enim, pulvinar sed mi non, dapibus laoreet sem. Donec at ex at orci vestibulum pellentesque. Duis vitae blandit odio, at sodales turpis. In posuere lacus rutrum elit vehicula egestas. Sed quis luctus massa. Fusce at laoreet tortor. Sed neque lacus, bibendum bibendum rutrum et, suscipit ut augue. Integer cursus, eros in ullamcorper faucibus, ante turpis vulputate magna, at volutpat libero libero nec enim. Quisque sagittis in nunc et eleifend. Phasellus sit amet fringilla ante. Maecenas pulvinar, est sed facilisis vestibulum, ipsum est pharetra ipsum, vel euismod leo arcu ac arcu. Donec vitae diam ut augue porttitor condimentum. Nunc elementum ipsum ac fermentum fermentum.Suspendisse feugiat hendrerit odio eget blandit. Nam eget suscipit felis, et scelerisque mauris. Vivamus pulvinar finibus urna vel aliquet. Ut tempor tincidunt urna, non tristique urna aliquam quis. Aliquam condimentum lacus non rutrum finibus. Phasellus et sapien ac nulla fermentum pulvinar. Phasellus ornare quam sit amet diam sodales lacinia. In et ante leo. Integer tempor ligula nec erat tempor volutpat. Duis eu scelerisque odio. In eu varius augue, eget iaculis dolor. In auctor fermentum lectus.Sed auctor felis in lectus iaculis, ac varius massa maximus. Phasellus mollis ipsum at arcu suscipit, quis laoreet diam volutpat. Duis non mauris eget urna faucibus finibus a eu est. Etiam vitae purus id leo blandit sollicitudin. Proin eget nulla laoreet, iaculis velit vitae, mattis nunc. Integer elementum tortor eros, sit amet maximus odio aliquet ut. Proin semper, leo ut vestibulum malesuada, nibh mi mollis ligula, quis imperdiet lectus libero quis magna.Pellentesque auctor sem est, eget imperdiet libero fermentum vehicula. Sed imperdiet, urna vel ornare feugiat, nunc justo dignissim purus, ac ullamcorper magna nulla eget justo. Proin vitae diam sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi velit ligula, ultrices mollis tincidunt ut, condimentum non erat. Aliquam eu erat metus. Sed mollis varius neque, lacinia congue risus finibus nec. Ut id tortor at dui feugiat volutpat vel et leo. Proin eget lectus quis ex sodales pretium. Phasellus sit amet turpis et elit ullamcorper laoreet sed eu lectus. Suspendisse non augue sed elit dignissim vehicula a porttitor dui. Donec pretium diam eget odio aliquam auctor. Vestibulum et elit ut eros tristique elementum.Vivamus interdum accumsan interdum. Morbi sed dui quis lacus porttitor tincidunt vitae in neque. Cras iaculis, metus in congue feugiat, lorem nibh venenatis velit, sed rutrum ante leo vitae lacus. Nam sed nibh nec ante aliquet faucibus quis at felis. Nullam interdum risus ac feugiat efficitur. Cras at tempus arcu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.";



export default function Page({ params }: { params: { id: string } }) {
  const schemeCategory10ScaleOrdinal = scaleOrdinal(schemeCategory10);

  const [data, setData] = useState([]);
  const rotate = useCallback((word: any) => word.value % 2, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/wordcloud'); // replace with your URL
      const text = await response.json();
      setData(text);
    };

    fetchData();
  }, []);


  return (

    <div className="w-screen h-screen">
      <WordCloud data={data} width={500} height={200} fontSize={(word) => Math.log2(word.value) * 20} rotate={rotate} />
      <QRCodeWindow qrData={params.id} />
    </div>

  )
}
