import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchApi } from '../../api/fetchApi';
import locationData from '../../etc/location/station.json';
import Loading from '../Common/Loading';

const KakaoMap = ({ location = '안양' }) => {
  const [loadKakao, setLoadKakao] = useState(false);
  const [fetchRouteErr, setFetchRouteErr] = useState(false);
  const [stateDatas, setStateDatas] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const { lat: latitude, lng: longitude } = locationData.filter(
      (v) => v['name'] === location
    )[0];

    //대림대학교 좌표
    const target = [37.4035503, 126.930539];

    const loadKakaoMapScript = () => {
      //카카오 맵을 script 태그로 삽입
      const $script = document.createElement('script');
      $script.async = true;
      $script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_REST_API_KEY}&autoload=false`;

      const onLoadKakaoMap = () => {
        //kakao.maps 가 로딩 되었을때 동작
        window.kakao.maps.load(async () => {
          //api 필요 요소 추출
          setIsLoading(true);

          // kakaoNav의 경로 검색을 위한 좌표값 추출 및 통신
          // kakaoNav의 경우 Client Side에서의 직접 통신을 허용하지 않는다
          // -> 이는 Server Side에서 ajax 요청을 받고 반환하는 형태로 통신한다.
          let data = await fetchApi.kakaoNav
            .get({
              origin: `${longitude},${latitude},name=start`,
              destination: `126.930539,37.4035503,name=asd`,
            })
            .then((res) => {
              return res.data.routes[0];
            })
            .catch((e) => setFetchRouteErr(true));
          setIsLoading(false);

          //이동거리 및 시간을 추출하여 변수로 저장한다.
          const { distance, duration } = data.sections[0];
          setStateDatas({ distance, duration });
          //지도 영역의 표시 좌표 사이즈를 조절하기 위해 Nav통신 값의 번위인 bound 를 받아온다.
          const bound = data.sections[0].bound;

          const mapContainer = document.getElementById('map');

          //kakao.maps를 지도상 최소 좌표 ( x, y좌표의 최솟값 기준으로 초기 세팅한다.)
          const mapOption = {
            center: new window.kakao.maps.LatLng(bound.min_y, bound.min_x), // 지도상 최소 좌표
            level: 3, // 지도의 확대 레벨 지정
          };

          //지도 생성
          const map = new window.kakao.maps.Map(mapContainer, mapOption);

          //지도 영역 재정렬 (실 화면 표시 범위를 지정한다.)
          const bounds = new kakao.maps.LatLngBounds(
            new kakao.maps.LatLng(bound.min_y, bound.min_x),
            new kakao.maps.LatLng(bound.max_y, bound.max_x)
          );
          map.setBounds(bounds);

          //선 좌표 입력 (kaka.maps.linePath 내장 객체를 활용하기 위해 kakaoNav통신으로 받은 경로 좌표를 가공한다.)
          var linePath = [];
          data.sections[0].roads.forEach((v) => {
            for (let i = 0; i < v.vertexes.length; i += 2) {
              linePath.push(
                new kakao.maps.LatLng(v.vertexes[i + 1], v.vertexes[i])
              );
            }
          });

          //경로의 디자인을 지정한다.
          var polyline = new kakao.maps.Polyline({
            path: linePath, // 선을 구성하는 좌표배열 입니다
            strokeWeight: 5, // 선의 두께 입니다
            strokeColor: '#01A6DE', // 선의 색깔입니다
            strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle: 'solid', // 선의 스타일입니다
          });

          // 지도에 경로를 표시한다.
          polyline.setMap(map);

          //지도에 마커를 표시한다.
          const positions = [
            {
              title: '대림대학교',
              latlng: new kakao.maps.LatLng(...target),
            },
            {
              title: location,
              latlng: new kakao.maps.LatLng(latitude, longitude),
            },
          ];

          //마커 이미지를 지정한다.
          var imageSrc =
            'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

          for (var i = 0; i < positions.length; i++) {
            // 마커 이미지의 이미지 크기 입니다
            var imageSize = new kakao.maps.Size(24, 35);

            // 마커 이미지를 생성합니다
            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
              map: map, // 마커를 표시할 지도
              position: positions[i].latlng, // 마커를 표시할 위치
              title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시
              image: markerImage, // 마커 이미지
            });
          }
        });
      };
      //kakao.maps. 가 로드 상태라면 스크립트를 추가해서 실행한다.
      $script.addEventListener('load', onLoadKakaoMap);
      //위에서 작성된 $script를 head에 추가 한다.
      document.head.appendChild($script);
    };

    !loadKakao && loadKakaoMapScript();
  }, [fetchRouteErr, loadKakao, location]);

  if (fetchRouteErr) return <div>{location}에 해당하는 좌표가 없습니다.</div>;

  return (
    <>
      <KaKaoMapContainer>
        <StateContainer>
          <div id="kakaoMapDistance">
            {isLoading && <Loading />}
            {Math.floor(stateDatas.distance / 1000) || '--'}Km
          </div>
          <div>
            예상 소요시간 | {Math.round(stateDatas.duration / 60) || '--'}분
          </div>
        </StateContainer>
        <div id="map" />
      </KaKaoMapContainer>
    </>
  );
};

const StateContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-size: ${(props) => props.theme.fontSize.sm};
  color: ${(props) => props.theme.color.orange};
  #kakaoMapDistance {
    background-color: ${(props) => props.theme.color.orange};
    color: ${(props) => props.theme.color.white};
    padding: 5px;
    margin-right: 10px;
    border-radius: 5px;
  }
`;

const KaKaoMapContainer = styled.div`
  #map {
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 3px 3px 5px 0.1px ${(props) => props.theme.color.lightgray};
    aspect-ratio: 1 / 1;
  }
`;

export default KakaoMap;
