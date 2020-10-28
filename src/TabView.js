import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import {
  Grid,
  Text,
  Box,
  Link,
  Stack,
  theme as systemTheme,
} from '@rebeldotcom/components'


const { colors } = systemTheme

const propTypes = {
  tabData: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
  }),).isRequired,
}

const TabView = ({ tabData: tabs }) => {

  const currentTab = useRef()
  const tabGrid = useRef()
  const tabPanel = useRef()

  const [selectedTab, setSelectedTab] = useState(tabs[0])

 
  const getTabIndex = pk => {
    return pk === selectedTab ? null : { tabIndex: '-1' }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const tabTrap = e => {
    switch (e.key) {
      case 'ArrowDown':
        tabPanel.current.focus()
        e.preventDefault()
        break
      case 'ArrowUp':
        currentTab.current.focus()
        e.preventDefault()
        break
      case 'ArrowLeft':
        if (selectedTab === tabs[0]) {
          setSelectedTab(tabs[tabs.length - 1])
          currentTab.current.focus()
        } else {
          setSelectedTab(tabs[tabs.indexOf(selectedTab) - 1])
          currentTab.current.focus()
        }
        break
      case 'ArrowRight':
        if (selectedTab === tabs[tabs.length - 1]) {
          setSelectedTab(tabs[0])
          currentTab.current.focus()
        } else {
          setSelectedTab(tabs[tabs.indexOf(selectedTab) + 1])
          currentTab.current.focus()
        }
        break
      default:
        break
    }
  }

  useEffect(() => {
    const currentTabGrid = tabGrid.current
    tabGrid.current.addEventListener('keydown', tabTrap)

    return () => {
      currentTabGrid.removeEventListener('keydown', tabTrap)
    }
  }, [tabTrap])

  return (
    <Stack
      ref={tabGrid}
      maxWidth="containers.sm"
      mt={4}
      width="100%"
      px={4}
    >
      <Grid
        as="ul"
        borderBottom="dark"
        borderLeft="dark"
        gridTemplateColumns={["1fr 1fr", "1fr 1fr 1fr 1fr"]}
        mb={3}
        role="tablist"
      >
        {tabs.map(tab => (
          <Box
            key={tab.title}
            as="li"
            bg={tab === selectedTab ? 'greys.8' : 'white'}
            borderRight="dark"
            borderTop="dark"
            role="presentation"
          >
            <Link
              aria-selected={tab === selectedTab}
              ariaLabel={tab.title}
              height="100%"
              href={`#${tab.title}`}
              id={tab.title}
              onClick={() => setSelectedTab(tab)}
              role="tab"
              width="100%"
              {...getTabIndex(tab)}
              ref={tab === selectedTab ? currentTab : null}
            >
              <Box px={3} py={2}>
                <Text
                  color={
                    tab === selectedTab ? colors.black : colors.greys[3]
                  }
                  variant={tab === selectedTab ? 'poundBold' : 'pound'}
                >
                  {tab.title}
                </Text>
              </Box>
            </Link>
          </Box>
        ))}
      </Grid>
      <Box
        ref={tabPanel}
        aria-labelledby={selectedTab.title}
        as="section"
        border="light"
        id={selectedTab.title}
        role="tabpanel"
        tabIndex="0"
        width="100%"
        justifyContent="center"
        alignItems="center"
        p={5}
      >
        <Text variant="gigaBold">
          {selectedTab.content}
        </Text>
      </Box>
    </Stack>  
  )
}

TabView.propTypes = propTypes

export { TabView }
