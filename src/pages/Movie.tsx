import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import styled from "styled-components";

interface MovieProps {
  movie: {
    id: number;
    url: string;
    title: string;
    year: number;
    runtime: number;
    yt_trailer_code: string;
    background_image: string;
    medium_cover_image: string;
    rating: string;
    isLiked: boolean;
  };
}

const MovieData = gql`
  query Movie($movieId: String!) {
    movie(id: $movieId) {
      id
      url
      title
      year
      runtime
      yt_trailer_code
      background_image
      medium_cover_image
      rating
      isLiked @client
    }
  }
`;

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
`;

const Image = styled.div<{ bg?: string }>`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
  border-radius: 7px;
`;

export const Movie = () => {
  const { id } = useParams();
  const { data, loading, error, client } = useQuery<MovieProps>(MovieData, {
    variables: {
      movieId: id,
    },
  });
  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>Could not fetch :(</h1>;
  }
  const onClick = () => {
    client.writeFragment({
      id: `Movie:${id}`,
      fragment: gql`
        fragment MovieFragment on Movie {
          isLiked
        }
      `,
      data: {
        isLiked: !data?.movie.isLiked,
      },
    });
  };
  return (
    <Container>
      <Column>
        <Title>{loading ? "Loading..." : `${data?.movie?.title}`}</Title>
        <Subtitle>⭐️ {data?.movie?.rating}</Subtitle>
        <button onClick={onClick}>
          {data?.movie.isLiked ? "unLike" : "Like"}
        </button>
      </Column>
      <Image bg={data?.movie?.medium_cover_image} />
    </Container>
  );
};
