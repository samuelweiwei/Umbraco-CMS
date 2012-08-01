using System;
using System.Linq;
using System.Xml;
using NUnit.Framework;
using Umbraco.Core;
using Umbraco.Tests.TestHelpers;
using umbraco.cms.businesslogic.packager;
using umbraco.interfaces;

namespace Umbraco.Tests
{
	[TestFixture]
	public class PackageActionFactoryTests
	{
		[SetUp]
		public void Initialize()
		{
			TestHelper.SetupLog4NetForTests();

			//this ensures its reset
			PluginManager.Current = new PluginManager();

			//for testing, we'll specify which assemblies are scanned for the PluginTypeResolver
			PluginManager.Current.AssembliesToScan = new[]
				{
					this.GetType().Assembly
				};
		}

		/// <summary>
		/// Ensures all IPackageActions are found
		/// </summary>
		[Test]
		public void Find_Package_Actions()
		{
			var actions = PackageAction.PackageActions;
			Assert.AreEqual(2, actions.Count());
		}

		#region Classes for tests
		public class PackageAction1 : IPackageAction
		{
			public bool Execute(string packageName, XmlNode xmlData)
			{
				throw new NotImplementedException();
			}

			public string Alias()
			{
				return "pa1";
			}

			public bool Undo(string packageName, XmlNode xmlData)
			{
				throw new NotImplementedException();
			}

			public XmlNode SampleXml()
			{
				throw new NotImplementedException();
			}
		}

		public class PackageAction2 : IPackageAction
		{
			public bool Execute(string packageName, XmlNode xmlData)
			{
				throw new NotImplementedException();
			}

			public string Alias()
			{
				return "pa2";
			}

			public bool Undo(string packageName, XmlNode xmlData)
			{
				throw new NotImplementedException();
			}

			public XmlNode SampleXml()
			{
				throw new NotImplementedException();
			}
		}
		#endregion
	}
}