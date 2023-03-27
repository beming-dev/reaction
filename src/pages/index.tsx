import { Box, Button, Flex, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Home() {
  const toast = useToast();
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  const [chance, setChance] = useState(5);
  const [visual, setVisual] = useState(false);
  const [timer, setTimer] = useState(3);
  const [start, setStart] = useState(false);
  const [firstClickTime, setFirstClickTime] = useState<number>(0);
  const [reactionRate, setReactionRate] = useState<number>(0);
  const [timeoutIds, setTimeoutIds] = useState<any[]>([]);
  const [recordScore, setRecordScore] = useState<number[]>([]);

  const init = () => {
    timeoutIds.forEach((id) => {
      clearTimeout(id);
    });
    setTimer(3);
    setStart(false);
    setChance(5);
    setVisual(false);
    setFirstClickTime(0);
    setReactionRate(0);
  };

  const moveBox = () => {
    const id = setTimeout(() => {
      if (start) {
        setVisual(true);
        setFirstClickTime(new Date().getTime());
      }
    }, Math.random() * 3500 + 1500);
    setTimeoutIds([...timeoutIds, id]);
  };

  const onWrongClick = () => {
    toast({
      title: "너무 일찍 클릭했어요!",
      description: "화면이 초록색으로 바뀌면 클릭해주세요",
      duration: 3000,
      isClosable: true,
    });
    init();
  };

  const onBoxClick = () => {
    if (firstClickTime) {
      setReactionRate(new Date().getTime() - firstClickTime);
      setRecordScore([...recordScore, new Date().getTime() - firstClickTime]);
    }
    setVisual(false);
    setChance(chance - 1);

    moveBox();
  };

  useEffect(() => {
    if (chance === 0) init();
  }, [chance]);

  useEffect(() => {
    if (start) setRecordScore([]);
    if (timer === 0) {
      moveBox();
    }

    if (start && timer >= 1) {
      const id = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
      setTimeoutIds([...timeoutIds, id]);
    }
  }, [timer, start]);

  const onStart = () => {
    setStart(true);
  };

  return (
    <Flex w="100vw" h="100vh" flexDir="column" justify="center" align="center">
      <Box
        w="100%"
        h="300px"
        mb="50px"
        position="relative"
        bgColor={
          !start ? "blackAlpha.100" : visual ? "#81C147" : "blackAlpha.100"
        }
        onClick={!start ? () => {} : visual ? onBoxClick : onWrongClick}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Text fontSize="2xl" color="black" zIndex="5">
          {timer !== 0 ? timer : visual ? "Click" : "Wait For Green..."}
        </Text>
      </Box>
      <Text>{reactionRate?.toString()}ms</Text>
      <Flex flexWrap="wrap" align="center" justify="center" m="20px 0">
        {new Array(5).fill(0).map((v, i) => (
          <Flex
            align="center"
            justify="center"
            w="100px"
            h="30px"
            borderRadius="7px"
            m="5px 5px"
            bgColor="blackAlpha.100"
          >
            {recordScore.length >= i + 1 && `${recordScore[i]}ms`}
          </Flex>
        ))}
      </Flex>
      <Button bgColor="blackAlpha.200" onClick={onStart}>
        테스트 시작
      </Button>
    </Flex>
  );
}
