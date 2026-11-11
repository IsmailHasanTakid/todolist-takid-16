
import { useState } from 'react';
import { FlatList, Pressable, Text, TextInput, View } from 'react-native';

// Name:Ismail Hasan Takid
// Roll:16
// Batch:D-87
// sem:7th
const TodoList = () => {

    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);

    const addTask = () => {
        if (!task.trim()) return;

        setTasks([...tasks,
        {
            id: Date.now().toString(),
            title: task.trim(),
            completed: false
        },
        ])
        setTask('');
    };

    const toggleTask = (id) => {
        setTasks(tasks.map((t) => (
            t.id === id ?
                { ...t, completed: !t.completed } : t)));

    }

    const deleteTask = (id) => {
        setTasks(tasks.filter(
            (t) => t.id !== id));
    }

    const totalTasks = tasks.length
    const remaining = tasks.filter((t) => !t.completed).length;
    const completed = tasks.filter((t) => t.completed).length;

    return (
        <View className="flex-1 bg-[#F0FDF4] px-5 pt-16">

            <View className="mb-8">
                <Text
                    className="text-3xl text-emerald-700"
                    style={{ fontFamily: 'Poppins-Bold' }}
                >
                    My TodoList
                </Text>

                <Text
                    className="text-gray-500 mt-1 text-sm"
                    style={{ fontFamily: 'Poppins-Regular' }}
                >
                    Organize your day, one task at a time.
                </Text>
            </View>

            <View className="flex-row gap-3 mb-8">

                <View className="flex-1 bg-white rounded-3xl p-5 border border-emerald-100">
                    <Text
                        className="text-3xl text-gray-800"
                        style={{ fontFamily: 'Poppins-Bold' }}
                    >
                        {totalTasks}
                    </Text>

                    <Text
                        className="text-xs text-gray-400 mt-1"
                        style={{ fontFamily: 'Poppins-Medium' }}
                    >
                        Total Tasks
                    </Text>
                </View>

                <View className="flex-1 bg-emerald-600 rounded-3xl p-5">
                    <Text
                        className="text-3xl text-white"
                        style={{ fontFamily: 'Poppins-Bold' }}
                    >
                        {remaining}
                    </Text>

                    <Text
                        className="text-xs text-emerald-100 mt-1"
                        style={{ fontFamily: 'Poppins-Medium' }}
                    >
                        Remaining
                    </Text>
                </View>

                <View className="flex-1 bg-white rounded-3xl p-5 border border-emerald-100">
                    <Text
                        className="text-3xl text-emerald-600"
                        style={{ fontFamily: 'Poppins-Bold' }}
                    >
                        {completed}
                    </Text>

                    <Text
                        className="text-xs text-gray-400 mt-1"
                        style={{ fontFamily: 'Poppins-Medium' }}
                    >
                        Completed
                    </Text>
                </View>

            </View>

            <Text
                className="text-lg text-gray-800 mb-3"
                style={{ fontFamily: 'Poppins-SemiBold' }}
            >
                Add New Task
            </Text>

            <View className="flex-row gap-3 mb-8">

                <TextInput
                    value={task}
                    onChangeText={setTask}
                    placeholder="What needs to be done?"
                    placeholderTextColor="#9CA3AF"
                    className="flex-1 bg-white rounded-2xl px-5 border border-emerald-100"
                    style={{
                        fontFamily: 'Poppins-Regular',
                        height: 55
                    }}
                />

                <Pressable
                    onPress={addTask}
                    className="px-5 rounded-2xl justify-center items-center bg-emerald-600 active:bg-emerald-700"
                >
                    <Text
                        className="text-white"
                        style={{ fontFamily: 'Poppins-Bold' }}
                    >
                        Add +
                    </Text>
                </Pressable>

            </View>

            <View className="flex-row justify-between items-center mb-4">
                <Text
                    className="text-xl text-gray-800"
                    style={{ fontFamily: 'Poppins-Bold' }}
                >
                    My Tasks
                </Text>

                <Text
                    className="text-xs text-emerald-600"
                    style={{ fontFamily: 'Poppins-Medium' }}
                >
                    {totalTasks} tasks
                </Text>
            </View>

            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 25 }}

                ListEmptyComponent={
                    <View className="bg-white rounded-3xl py-12 items-center border border-emerald-100">
                        <Text className="text-4xl mb-3">📝</Text>

                        <Text
                            className="text-gray-700"
                            style={{ fontFamily: 'Poppins-SemiBold' }}
                        >
                            No tasks yet!
                        </Text>

                        <Text
                            className="text-gray-400 text-xs mt-1"
                            style={{ fontFamily: 'Poppins-Regular' }}
                        >
                            Add your first task above.
                        </Text>
                    </View>
                }

                renderItem={({ item }) => (
                    <View className="flex-row items-center justify-between bg-white rounded-2xl px-4 py-4 mb-3 border border-emerald-50">

                        <Pressable
                            onPress={() => toggleTask(item.id)}
                            className="flex-row items-center gap-3 flex-1"
                        >
                            <View
                                className={`w-6 h-6 rounded-lg border-2 items-center justify-center ${item.completed
                                    ? 'bg-emerald-500 border-emerald-500'
                                    : 'border-gray-300'
                                    }`}
                            >
                                {item.completed && (
                                    <Text className="text-white text-xs">✓</Text>
                                )}
                            </View>

                            <Text
                                className={`flex-1 ${item.completed
                                    ? 'line-through text-gray-400'
                                    : 'text-gray-800'
                                    }`}
                                style={{ fontFamily: 'Poppins-Medium' }}
                            >
                                {item.title}
                            </Text>
                        </Pressable>

                        <Pressable
                            onPress={() => deleteTask(item.id)}
                            className="bg-red-50 px-3 py-2 rounded-xl ml-2"
                        >
                            <Text
                                className="text-red-500 text-xs"
                                style={{ fontFamily: 'Poppins-SemiBold' }}
                            >
                                Delete
                            </Text>
                        </Pressable>

                    </View>
                )}
            />

        </View>
    )
}

export default TodoList
