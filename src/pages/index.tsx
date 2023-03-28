import {
  Box,
  Button,
  Flex,
  Slide,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Home() {
  //140 ~ 1000 => 570
  const rank = [150];

  const toast = useToast();
  const [chance, setChance] = useState(5);
  const [visual, setVisual] = useState(false);
  const [timer, setTimer] = useState(3);
  const [start, setStart] = useState(false);
  const [firstClickTime, setFirstClickTime] = useState<number>(0);
  const [reactionRate, setReactionRate] = useState<number>(0);
  const [timeoutIds, setTimeoutIds] = useState<any[]>([]);
  const [recordScore, setRecordScore] = useState<number[]>([]);

  const { isOpen, onToggle } = useDisclosure();

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
    if (chance === 0) {
      onToggle();
      init();
    }
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
    <Flex
      w="100vw"
      h="calc(100vh - 70px)"
      flexDir="column"
      justify="center"
      align="center"
      fontWeight="400"
      position="relative"
    >
      <Text as="b">테스트는 총 5회 진행됩니다!</Text>
      <Box
        w="100%"
        h="300px"
        m="50px 0"
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
            key={i}
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

      <Slide direction="bottom" in={isOpen} style={{ zIndex: 10 }}>
        <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          p="40px"
          m="5vh"
          h="50vh"
          mt="4"
          color="white"
          bg="teal.500"
          shadow="md"
          fontSize="2xl"
        >
          <Text as="b">테스트 결과</Text>
          <Text m="20px 0">
            평균 속도:{" "}
            {recordScore.reduce((a, b) => a + b, 0) / recordScore.length}ms
          </Text>
          <Text mb="20px">
            상위{" "}
            {Math.floor(
              ((recordScore.reduce((a, b) => a + b, 0) / recordScore.length -
                150) /
                850) *
                100
            )}{" "}
            %입니다!
          </Text>
          <Button
            bgColor="transparent"
            border="1px solid white"
            onClick={onToggle}
          >
            닫기
          </Button>
        </Flex>
      </Slide>
    </Flex>
  );
}
