// @ts-nocheck
import { useRef, useState, useEffect } from "react";
import {
  ActionIcon,
  Box,
  Group,
  SimpleGrid,
  Grid,
  Container,
  Tabs,
  Text,
  Title,
  UnstyledButton,
  useMantineTheme,
  Center,
} from "@mantine/core";
import { useMediaQuery, useScrollIntoView } from "@mantine/hooks";
import { Plus, Minus } from "tabler-icons-react";

const customColors = {
  backgroundHeader: "#060409",
  backgroundMain: "#060409",
  backroundPanelTabs: "#212121",
  backgroundAside: "#060409",
  textColorHead: "#d9f070",
  stackLineBorder1: "solid 1px #d9f070",
};

export default function Home() {
  const tabLabels = ["one", "two"];
  const [activeTab, setActiveTab] = useState("");
  const theme = useMantineTheme();
  const largeScreen = useMediaQuery(
    `(min-width: ${theme.breakpoints.xl.toFixed()}px)`
  );

  const columnsL = largeScreen ? 4 : 6;
  const columnsR = largeScreen ? 8 : 6;
  const widthL = largeScreen ? "35vw" : "90vw";
  const widthR = largeScreen ? "55vw" : "90vw";

  // TODO ---- переделать  ----
  // https://beta.reactjs.org/learn/manipulating-the-dom-with-refs#how-to-manage-a-list-of-refs-using-a-ref-callback
  // https://github.com/mantinedev/mantine/blob/modal-base/docs/src/components/MdxPage/TableOfContents/TableOfContents.tsx
  //
  const containerRef = useRef(null);
  const the1Ref = useRef(null);
  const the2Ref = useRef(null);
  const { scrollIntoView: scrollIntoViewOne, targetRef: oneRef } =
    useScrollIntoView({
      offset: 200,
      alignment: "start",
    });
  const { scrollIntoView: scrollIntoViewTwo, targetRef: twoRef } =
    useScrollIntoView({
      offset: 100,
      alignment: "start",
    });
  const handleScroll = () => {
    const containerY = containerRef.current.getBoundingClientRect().top;
    const oneOffset = Math.abs(
      oneRef.current.getBoundingClientRect().top // - containerY
    );
    const twoOffset = Math.abs(
      twoRef.current.getBoundingClientRect().top // - containerY
    );
    // eslint-disable-next-line
    console.dir(`log changes, ${oneOffset}, ${twoOffset}, ${containerY} `);
    if (oneOffset < twoOffset) setActiveTab("one");
    if (twoOffset < oneOffset) setActiveTab("two");
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    setActiveTab("one");
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //

  const defaultStyle = {
    main: {
      background: customColors.backgroundMain,
      maxwidth: "100vw",
      justify: "center",
      padding: "1% 1% 1% 1%",
      border: customColors.stackLineBorder1,
    },
    container: largeScreen
      ? {
          minWidth: "100vw",
          minHeight: "50vh",
        }
      : {
          minWidth: "10vw",
          minHeight: "10vh",
          border: "none",
        },
    onewrapp: {
      minHeight: "80vh",
      padding: "2% 2% 0 0",
      margin: "2% 2% 0% 0%",
    },

    twowrapp: {
      minHeight: "80vh",
      padding: "2% 2% 0 0",
      margin: "2% 2% 0% 0%",
    },
  };

  const style = largeScreen
    ? {
        position: "relative",
        top: "1vh",
      }
    : {
        position: "unset",
        width: "100%",
      };

  return (
    <>
      <Box style={style}>
        <div
          flex={1}
          sx={{
            minHeight: "10vh",
            minWidth: "50vw",
            position: "fixed",
            padding: "0 0 0 0",
            background: customColors.backroundPanelTabs,
          }}
        >
          {!largeScreen && (
            <Tabs
              value={activeTab}
              onTabChange={setActiveTab}
              sx={{
                visibility: largeScreen ? "hidden" : "visible",
                position: "fixed",
                top: "7vh",
                background: customColors.backroundPanelTabs,
                width: "100vw",
                paddingRight: 0,
                margin: "0 0 0vh 0vh",
              }}
            >
              <Tabs.List>
                <Tabs.Tab
                  value="one"
                  onClick={() => scrollIntoViewOne({ alignment: "start" })}
                >
                  one
                </Tabs.Tab>
                <Tabs.Tab
                  value="two"
                  onClick={() => scrollIntoViewTwo({ alignment: "start" })}
                >
                  two
                </Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value="one">one panel</Tabs.Panel>
              <Tabs.Panel value="two">two panel</Tabs.Panel>
            </Tabs>
          )}
        </div>
        <Container
          style={{
            ...defaultStyle.main,
            ...defaultStyle.container,
          }}
          ref={containerRef}
        >
          <Text
            span={true}
            transform="uppercase"
            size={56}
            color={customColors.textColorHead}
            sx={{
              letterSpacing: "-4px",
              fontStretch: "condensed",
              fontFamily: "Roboto Mono, sans-serif, mono",
            }}
          >
            some text there
          </Text>
          <Grid>
            <Grid.Col
              xs={columnsL}
              style={{ ...defaultStyle.main }}
              sx={{
                minHeight: "1vh",

                maxWidth: widthL,

                padding: "0% 0% 2% 0%",
                margin: "10% 0% 0% 0%",
              }}
            >
              <Box
                style={{ ...defaultStyle.onewrapp }}
                id={tabLabels[0]}
                ref={oneRef}
              >
                1
                <Plus />
              </Box>
            </Grid.Col>
            <Grid.Col
              xs={columnsR}
              style={{ ...defaultStyle.main }}
              sx={{
                minHeight: "1vh",
                maxWidth: widthR,
                padding: "0% 0% 2% 0%",
                margin: "10% 0% 0% 0%",
              }}
            >
              <Box
                style={{ ...defaultStyle.twowrapp }}
                id={tabLabels[1]}
                ref={twoRef}
              >
                2
                <Minus />
              </Box>
            </Grid.Col>
          </Grid>
        </Container>
        <Text> 1 </Text>
      </Box>
    </>
  );
}
