import React, { useState, createContext, useContext } from 'react';

export interface Config {
	minimal: boolean;
}

type DispatchConfig = Config | ((current_config: Config) => Config);

interface ConfigContext {
	config: Config;
	setConfig: React.Dispatch<DispatchConfig>;
}

const defaultConfig: Config = {
	minimal: false,
};

const localStorageConfig = localStorage.getItem('config');

const ConfigContext = createContext<ConfigContext>({} as ConfigContext);

export const ConfigProvider: React.FC = ({ children }) => {
	let localConfig;

	if (!localStorageConfig) localConfig = defaultConfig;
	else localConfig = JSON.parse(localStorageConfig);

	const [config, setConfig] = useState(localConfig);

	return (
		<ConfigContext.Provider value={{ config, setConfig }}>
			{children}
		</ConfigContext.Provider>
	);
};

export const useConfig = () => {
	const { config, setConfig } = useContext(ConfigContext);

	const changeConfig = (config: Config) => {
		setConfig(config);
		localStorage.setItem('config', JSON.stringify(config));
	};

	return { config, setConfig: changeConfig };
};
