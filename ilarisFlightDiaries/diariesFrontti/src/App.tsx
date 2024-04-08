import { useState, useEffect } from "react";
import { DiaryEntry, Visibility, Weather } from "./types";
import { getAllDiaries, createDiary } from "./services/diaryService";
import { toNewDiaryEntry } from "./utils";
//import "./index.css";
//import "./App.css";

const currentDate = new Date().toJSON().slice(0, 10);

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [messu, setMessu] = useState(null);

  const [newDate, setNewDate] = useState("");
  const [newVisibility, setNewVisibility] = useState<Visibility>(
    {} as Visibility
  );
  const [newWeather, setNewWeather] = useState<Weather>({} as Weather);
  const [newComment, setNewComment] = useState("");

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      date: { value: string };
      visibility: { value: Visibility };
      weather: { value: Weather };
      comment: { value: string };
    };

    //const date = target.date.value; // typechecks!
    //const visibility = target.visibility.value; // typechecks!
    //const weather = target.weather.value; // typechecks!
    const comment = target.comment.value; // typechecks!

    const tarkastettuNewDiary = toNewDiaryEntry({
      date: newDate,
      visibility: newVisibility,
      weather: newWeather,
      comment: comment,
    });

    createDiary(tarkastettuNewDiary).then((data) => {
      if (data as DiaryEntry) {
        if (data.visibility) {
          setDiaries(diaries.concat(data as DiaryEntry));

          setNewComment("");
        } else {
          setMessu(data);
          setTimeout(() => {
            setMessu(null);
          }, 5000);
        }
      }
    });
  };

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  return (
    <div>
      <h1>Add New Diary</h1>
      {messu && <div className="error"> {messu}</div>}
      <form onSubmit={diaryCreation}>
        <label>
          Choose date:{" "}
          <input
            type="date"
            name="entry"
            min="2017-04-01"
            max={currentDate}
            onChange={(event) => setNewDate(event.target.value)}
            required
          />
        </label>
        <fieldset>
          <legend>Select visibility:</legend>
          <div>
            <input
              type="radio"
              id="vbChoice1"
              name="visibility"
              value={newVisibility}
              onChange={() => setNewVisibility("great" as Visibility)}
              required
            />
            <label htmlFor="vbChoice1">great</label>
            <input
              type="radio"
              id="vbChoice2"
              name="visibility"
              value={newVisibility}
              onChange={() => setNewVisibility("good" as Visibility)}
            />
            <label htmlFor="vbChoice2">good</label>
            <input
              type="radio"
              id="vbChoice3"
              name="visibility"
              value={newVisibility}
              onChange={() => setNewVisibility("ok" as Visibility)}
            />
            <label htmlFor="vbChoice3">ok</label>
            <input
              type="radio"
              id="vbChoice4"
              name="visibility"
              value={newVisibility}
              onChange={() => setNewVisibility("poor" as Visibility)}
            />
            <label htmlFor="vbChoice4">poor</label>
          </div>
        </fieldset>
        <fieldset>
          <legend>Select wheater:</legend>
          <div>
            <input
              type="radio"
              id="whChoice1"
              name="wheater"
              value={newWeather}
              onChange={() => setNewWeather("sunny" as Weather)}
              required
            />
            <label htmlFor="whChoice1">sunny</label>
            <input
              type="radio"
              id="whChoice2"
              name="wheater"
              value={newWeather}
              onChange={() => setNewWeather("rainy" as Weather)}
            />
            <label htmlFor="whChoice2">rainy</label>
            <input
              type="radio"
              id="whChoice3"
              name="wheater"
              value={newWeather}
              onChange={() => setNewWeather("cloudy" as Weather)}
            />
            <label htmlFor="whChoice3">cloudy</label>
            <input
              type="radio"
              id="whChoice4"
              name="wheater"
              value={newWeather}
              onChange={() => setNewWeather("stormy" as Weather)}
            />
            <label htmlFor="whChoice4">stormy</label>
            <input
              type="radio"
              id="whChoice5"
              name="wheater"
              value={newWeather}
              onChange={() => setNewWeather("windy" as Weather)}
            />
            <label htmlFor="whChoice5">windy</label>
          </div>
        </fieldset>
        comment:{" "}
        <input
          name="comment"
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
        />
        <button type="submit">add</button>
      </form>
      <h1>Diary Entries</h1>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <strong>{diary.date} </strong>
          <p>visibility: {diary.visibility}</p>
          <p>weather: {diary.weather}</p>
          <p>comment: {diary.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
