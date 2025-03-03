namespace Umbraco.Cms.Core.Deploy;

/// <summary>
/// Represents a file source, ie a mean for a target environment involved in a
/// deployment to obtain the content of files being deployed.
/// </summary>
public interface IFileSource
{

    /// <summary>
    /// Gets the content of a file as a stream.
    /// </summary>
    /// <param name="udi">A file entity identifier.</param>
    /// <param name="token">A cancellation token.</param>
    /// <returns>
    /// A stream with read access to the file content.
    /// </returns>
    /// <remarks>
    /// <para>Returns null if no content could be read.</para>
    /// <para>The caller should ensure that the stream is properly closed/disposed.</para>
    /// </remarks>
    Task<Stream> GetFileStreamAsync(StringUdi udi, CancellationToken token);

    /// <summary>
    /// Gets the content of a file as a string.
    /// </summary>
    /// <param name="udi">A file entity identifier.</param>
    /// <param name="token">A cancellation token.</param>
    /// <returns>
    /// A string containing the file content.
    /// </returns>
    /// <remarks>
    /// Returns null if no content could be read.
    /// </remarks>
    Task<string> GetFileContentAsync(StringUdi udi, CancellationToken token);

    /// <summary>
    /// Gets the length of a file.
    /// </summary>
    /// <param name="udi">A file entity identifier.</param>
    /// <param name="token">A cancellation token.</param>
    /// <returns>
    /// The length of the file, or -1 if the file does not exist.
    /// </returns>
    Task<long> GetFileLengthAsync(StringUdi udi, CancellationToken token);

    /// <summary>
    /// Gets files and store them using a file store.
    /// </summary>
    /// <param name="udis">The UDIs of the files to get.</param>
    /// <param name="fileTypes">A collection of file types which can store the files.</param>
    /// <param name="continueOnFileNotFound">A flag indicating whether to continue if a file isn't found or to stop and throw a FileNotFoundException.</param>
    /// <param name="token">A cancellation token.</param>
    /// <returns>
    /// The task object representing the asynchronous operation.
    /// </returns>
    Task GetFilesAsync(IEnumerable<StringUdi> udis, IFileTypeCollection fileTypes, bool continueOnFileNotFound, CancellationToken token);
}
