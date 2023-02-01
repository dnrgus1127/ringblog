// ? github Repository readme 불러오는 fetch 함수
// useEffect(() => {
//     fetch(`https://api.github.com/repos/dnrgus1127/portfolio/readme`)
//       .then((res) => res.json())
//       .then((json) => {
//         fetch(json.download_url)
//           .then((res) => res.text())
//           .then((markdown) => {
//             setData(markdown);
//           });
//       });
//   }, []);
