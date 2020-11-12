import { useQuery, gql } from '@apollo/client';

const LAUNCHES_INFOS = gql`
  query GetFiveLaunches {
    launches(limit: 5) {
      launch_date_utc
      launch_success
      rocket {
        rocket_name
      }
      links {
        video_link
      }
      details
    }
  }
`;

const LaunchesInfos = () => {
  const { loading, error, data } = useQuery(LAUNCHES_INFOS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error}(</p>;

  console.log(data)
  return data.launches.map((launch, index) => (
    <div key={index}>
      <h2>{launch.rocket.rocket_name}</h2>
      <p>
        Launch date : {launch.launch_date_utc}
      </p>
      <p>
        Launch success : {launch.launch_success ? 'Oui' : 'Non'}
      </p>
      <p>
        Details : {launch.details}
      </p>
      <a target="_blank" rel="noreferrer" href={launch.links.video_link}>Voir la vidéo</a>
    </div>
  ));
}

export default LaunchesInfos;