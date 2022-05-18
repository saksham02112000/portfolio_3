// import * as React from 'react';
// import PropTypes from 'prop-types';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
import {Container} from "@mui/material";
// import {useContext} from "react";
import {ThemeContext} from "../../contexts/ThemeContext";
import "./ExperienceTabs.css";
//
// function TabPanel(props) {
//     const { children, value, index, ...other } = props;
//
//     return (
//         <div
//             role="tabpanel"
//             hidden={value !== index}
//             id={`vertical-tabpanel-${index}`}
//             aria-labelledby={`vertical-tab-${index}`}
//             {...other}
//         >
//             {value === index && (
//                 <Box sx={{ p: 3 }}>
//                     <Typography>{children}</Typography>
//                 </Box>
//             )}
//         </div>
//     );
// }
//
// TabPanel.propTypes = {
//     children: PropTypes.node,
//     index: PropTypes.number.isRequired,
//     value: PropTypes.number.isRequired,
// };
//
// function a11yProps(index) {
//     return {
//         id: `vertical-tab-${index}`,
//         'aria-controls': `vertical-tabpanel-${index}`,
//     };
// }
//
// export default function ExperienceTabs() {
//     const [value, setValue] = React.useState(0);
//
//     const { theme } = useContext(ThemeContext);
//
//     const handleChange = (event, newValue) => {
//         setValue(newValue);
//     };
//
//     return (
//         <div className="experienceTabs">
//             <Container maxWidth="xl" style={{backgroundColor: theme.secondary}}>
//                 <div className="projects--header">
//                     <h1 className="front-header">Experience </h1>
//                     <h1 className="back-header" style={{color: theme.primary}}>I've</h1>
//                 </div>
//                 <Box
//                     sx={{ flexGrow: 1, bgcolor: theme.secondary, display: 'flex', height: 400 }}
//                 >
//                     <Tabs
//                         orientation="vertical"
//                         variant="scrollable"
//                         value={value}
//                         onChange={handleChange}
//                         sx={{ borderRight: 1, borderColor: theme.primary }}
//                     >
//                         <Tab label="Item One" {...a11yProps(0)} />
//                         <Tab label="Item Two" {...a11yProps(1)} />
//                         <Tab label="Item Three" {...a11yProps(2)} />
//                         <Tab label="Item Four" {...a11yProps(3)} />
//                     </Tabs>
//                     <TabPanel value={value} index={0}>
//                         Folioplay
//                     </TabPanel>
//                     <TabPanel value={value} index={1}>
//                         Excelegal
//                     </TabPanel>
//                     <TabPanel value={value} index={2}>
//                         HireByCode
//                     </TabPanel>
//                     <TabPanel value={value} index={3}>
//                         EvolvFit
//                     </TabPanel>
//                 </Box>
//             </Container>
//         </div>
//     );
// }

import React, {useContext, useState} from "react";
import { makeStyles, Tabs, Tab, Typography, Box, Link, useTheme, useMediaQuery } from "@material-ui/core";
import { Language } from "@material-ui/icons";
import { experienceList } from "./Data";
import IconBtn from "./IconButton";
// import { useTranslation } from "react-i18next";

const ExperienceTabs = () => {
    const themeMUI = useTheme();
    // eslint-disable-next-line no-use-before-define
    const {theme} = useContext(ThemeContext);
    const isMobile = useMediaQuery(themeMUI.breakpoints.down("sm"));
    const classes = useStyles({ isMobile });
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="experienceTabs">
            <Container maxWidth="xl" style={{backgroundColor: theme.secondary}}>
                <div className="projects--header">
                    <h1 className="front-header">Experience </h1>
                    <h1 className="back-header" style={{color: theme.primary}}>I've</h1>
                </div>
            </Container>
            <Container maxWidth="xl">
                <div className={classes.root}>
                    <Tabs
                        orientation={isMobile ? "horizontal" : "vertical"}
                        value={value}
                        onChange={handleChange}
                        className={classes.tabs}
                        classes={{ indicator: classes.indicator }}
                        centered

                    >
                        {experienceList.map((elem) => (
                            <Tab className="experienceTabLeftScroller" label={elem.company} key={elem.id} />
                        ))}
                    </Tabs>
                    {experienceList.map((elem) => (
                        <TabPanel value={value} index={elem.id} key={elem.id}>
                            <Box mb={4}>
                                <h1 className="headingWorked">
                                    <span className="front-header">
                                    {elem.position}
                                    </span>
                                    <span>
                                        <Link
                                            href={elem.links.website}
                                            color="white"
                                            className="companyWorked"
                                        >
                                            @ {elem.company}
                                        </Link>
                                    </span>
                                </h1>
                                <div className="companyDuration">
                                    {elem.duration}
                                </div>
                            </Box>
                            <Box mb={4}>
                                <div className="companyAbout">
                                    {elem.about}
                                </div>
                            </Box>
                            <Box mb={4}>
                                <div className="companyTech">
                                    {elem.techStack.map((techStack, key)=>{
                                        return(
                                            <span className="companyTechStack" key={key}>
                                                {techStack}
                                            </span>
                                        )
                                    })}
                                </div>
                            </Box>
                            <Box>
                                {elem.links.website && (
                                    <IconBtn icon={Language} fontSize={28} m={1} href={elem.links.website} />
                                )}
                            </Box>
                        </TabPanel>
                    ))}
                </div>
            </Container>
        </div>
    );
};

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3} minHeight={isMobile ? 0 : "350px"}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

const useStyles = makeStyles((themeMUI) => ({
    root: {
        flexGrow: 1,
        // backgroundColor: themeMUI.palette.background.main,
        color: "white",
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: (props) => (props.isMobile ? "column" : "row"),
    },
    tabs: {
        color: "white",
        borderRight: (props) => (props.isMobile ? "none" : `1px solid ${themeMUI.palette.secondary.main}`),
        borderBottom: (props) => (!props.isMobile ? "none" : `1px solid ${themeMUI.palette.secondary.main}`),
        width: (props) => (props.isMobile ? "inherit" : "200px"),
        maxWidth: (props) => (props.isMobile ? "inherit" : "200px"),
        minWidth: (props) => (props.isMobile ? "inherit" : "200px"),
    },
    indicator: {
        backgroundColor: "red",
    },
}));

export default ExperienceTabs;

