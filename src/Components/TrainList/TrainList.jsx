import React from 'react';
import { Card} from 'antd';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../LoadingSpinner';
function TrainList() {
  const trainList = useSelector((state) => state.Irctc.fetchedtrainlist);
  const isLoading = useSelector((state) => state.Irctc.fetchTrainListError);
   if (isLoading) {
    return <LoadingSpinner/>;
  }
  if (!trainList || trainList.length === 0) {
    return (
      <div>
        <p>No trains found for the selected criteria.</p>
      </div>
    );
  }
  return (
    <div>
      {trainList.map((train) => (
            <Card
              key={train.train_number}
              style={{ margin: '20px', borderColor: '#516395', borderWidth: '4px' }}
            >
              <h2>{train.train_name}({train.train_number})</h2>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <p style={{ color: 'green', fontWeight: 'bold' }}>
                  Runs on: {train.run_days.join(', ')}
                </p>
                <h4>----{train.duration}---</h4>
                <p style={{ color: 'green', fontWeight: 'bold' }}>
                  Classes: {train.class_type.join(', ')}
                </p>
              </div>
              <table key={train.train_number}>
                <thead>
                  <tr>
                    <th>Source</th>
                    <th>Departure Time</th>
                    <th>Destination</th>
                    <th>Arrival Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{train.from_station_name}</td>
                    <td>{train.from_std}</td>
                    <td>{train.to_station_name}</td>
                    <td>{train.to_std}</td>
                  </tr>
                </tbody>
              </table>
            </Card>
          ))}
          </div>
  );
}
export default TrainList;



