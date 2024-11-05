import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    FlatList,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';
import { Milestone } from '@/utils/interfaces';
import Svg, { Line, Circle } from 'react-native-svg';

interface MilestonesListProps {
    milestones: Milestone[];
    onToggleComplete?: (milestone: Milestone) => void;
}

const MilestonesList = ({
    milestones,
    onToggleComplete,
}: MilestonesListProps) => {
    // Sort milestones: completed first, then incomplete
    const sortedMilestones = [...milestones].sort((a, b) => {
        if (a.completed === b.completed) return 0;
        return a.completed ? -1 : 1;
    });

    const renderMilestone = ({
        item,
        index,
    }: {
        item: Milestone;
        index: number;
    }) => {
        const isLast = index === sortedMilestones.length - 1;

        return (
            <View style={styles.milestoneWrapper}>
                <View
                    style={
                        item.completed
                            ? styles.completedMilestone
                            : styles.milestoneContainer
                    }
                >
                    <View style={styles.milestoneHeader}>
                        <View style={styles.leftContent}>
                            <MaterialCommunityIcons
                                name="map-marker-outline"
                                size={20}
                                color="#64867e"
                            />
                            <Text style={styles.milestoneName}>
                                {item.name}
                            </Text>
                        </View>
                        <Pressable
                            onPress={() => onToggleComplete?.(item)}
                            style={[
                                styles.checkbox,
                                item.completed &&
                                    styles.checkboxChecked,
                            ]}
                        >
                            {item.completed && (
                                <MaterialCommunityIcons
                                    name="check"
                                    size={16}
                                    color="#fff"
                                />
                            )}
                        </Pressable>
                    </View>

                    <Progress.Bar
                        progress={item.progress}
                        width={null}
                        color={'#64867e'}
                        unfilledColor="#cbd1d1"
                        borderWidth={0}
                        style={styles.progressBar}
                    />
                </View>
                {!isLast && (
                    <View
                        style={
                            item.completed
                                ? styles.connectorCompleted
                                : styles.connector
                        }
                    />
                )}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={sortedMilestones}
                renderItem={renderMilestone}
                keyExtractor={(item) => item.id.toString()}
                style={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    list: {
        flex: 1,
    },
    milestoneHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    leftContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    milestoneName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginLeft: 8,
        width: '90%',
        lineHeight: 20,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#64867e',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        backgroundColor: '#64867e',
    },
    progressBar: {
        marginTop: 8,
    },
    container: {
        flex: 1,
    },
    milestoneWrapper: {
        alignItems: 'center',
    },
    milestoneContainer: {
        backgroundColor: '#fff',
        marginHorizontal: 8,
        borderRadius: 8,
        padding: 16,
        width: '100%',
        borderColor: '#cbd1d1',
        borderWidth: 2,
        height: 100,
    },
    completedMilestone: {
        backgroundColor: '#fff',
        marginHorizontal: 8,
        width: '100%',
        borderRadius: 8,
        padding: 16,
        borderColor: '#64867e',
        borderWidth: 2,
        height: 100,
    },
    connector: {
        width: 2,
        height: 20,
        backgroundColor: '#cbd1d1',
        //marginVertical: 4,
    },
    connectorCompleted: {
        width: 2,
        height: 20,
        backgroundColor: '#64867e',
    },
});

export default MilestonesList;
