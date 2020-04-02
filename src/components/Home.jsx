import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import PropTypes from 'prop-types';
import * as courseActions from '../redux/actions/courseActions';

function Home() {
  const courses = useSelector((state) => state.courses);
  const dispatch = useDispatch();
  const [course, setCourse] = useState({ title: '' });

  const handleChange = (event) => {
    setCourse({ ...course, title: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(courseActions.createCourse(course));
  };

  return (

    <div>
      <div className="container">
        <h1>Courses </h1>
        <h2>Add Course</h2>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Enter course"
                value={course.title}
                onChange={handleChange}
              />
              <div className="field">
                <p className="control">
                  <input type="submit" value="Save" className="button is-info" />
                </p>
              </div>
            </div>
          </div>
          {courses.map((c) => (
            <div key={c.title}>
              {c.title}
            </div>
          ))}
        </form>

      </div>

    </div>
  );
}


export default Home;
