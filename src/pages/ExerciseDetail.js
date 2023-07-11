import { Box } from '@mui/material'
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import {exerciseOptions, fetchdata, youtubeOptions} from '../utils/fetchData'
import Detail from '../components/Detail'
import ExerciseVideos from '../components/ExerciseVideos'
import SimilarExercises from '../components/SimilarExercises'


function ExerciseDetail() {
const [exerciseDetail, setexerciseDetail] = useState({});
const [exerciseVideos, setexerciseVideos] = useState([]);
const [targetMuscleExercises, settargetMuscleExercises] = useState([]);
const [equipmentExercises, setequipmentExercises] = useState([]);

const { id } = useParams();

useEffect(()=>{
  const fetchExerciseData = async ()=>{
    const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com';
    const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';
    const exerciseDetailData = await fetchdata(`${exerciseDbUrl}/exercises/exercise/${id}`, exerciseOptions);
    setexerciseDetail(exerciseDetailData);

    const exerciseVideosData = await fetchdata(`${youtubeSearchUrl}/search?query=${exerciseDetailData.name}`, youtubeOptions);
    setexerciseVideos(exerciseVideosData.contents);

    const targetMuscleExerciseData = await fetchdata(`${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`, exerciseOptions);
    
    settargetMuscleExercises(targetMuscleExerciseData);
    const equipmentExerciseData = await fetchdata(`${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`, exerciseOptions);
    setequipmentExercises(equipmentExerciseData);

  }
  fetchExerciseData();
},[id])


  return (
    <Box>
      <Detail exerciseDetail={exerciseDetail}/>
      <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetail.name}/>
      <SimilarExercises targetMuscleExercises={targetMuscleExercises} equipmentExercises={equipmentExercises}/>
    </Box>
  )
}

export default ExerciseDetail